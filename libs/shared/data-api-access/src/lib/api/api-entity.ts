import { HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { AsyncRequestState, DataApiAccessService } from '@course-fe-next/shared/data-api-access';
import { RxState } from '@rx-angular/state';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { ApiResponseBody, ApiResponseBodyTypeConstructor } from './api-type';

class AsyncRequestStream<P, R extends ApiResponseBody> {
  private readonly invoker = new Subject<P>();

  readonly response$: Observable<R>;

  readonly state$: Observable<AsyncRequestState<R>>;

  constructor(requester: (params: P) => Observable<AsyncRequestState<R>>) {
    const state$ = this.invoker.pipe(switchMap(requester));
    this.response$ = state$.pipe(
      filter((state) => state.completed),
      map((state) => state.responseObject!),
      shareReplay(1)
    );
    this.state$ = state$.pipe(shareReplay(1));
  }

  invoke(params: P) {
    this.invoker.next(params);
  }

  destroy() {
    this.invoker.complete();
  }
}

/**
 * 实体类的配置
 *
 * @template T
 */
export class ApiEntityConfiguration<T extends ApiResponseBodyTypeConstructor<any>, E> {
  /**
   * 表示此实体对应的数据类型的构造器，参见{@link ApiResponseBodyTypeConstructor}
   *
   * @see ApiResponseBodyTypeConstructor
   */
  readonly typeConstructor!: T;

  /**
   * 表示此实体对应的REST Api Endpoint
   */
  readonly endpoints!: E;
}

export class StaticEntityEndpoints {
  constructor(readonly getPath: string, readonly postPath: string) {}

  /**
   * 向GET、POST、DELETE、PUT方法应用同一个路径，以构造这样的`StaticEntityEndpoints`对象
   *
   * @param {string} path 路径
   * @returns {StaticEntityEndpoints} GET、POST、DELETE、PUT方法都对应同一个路径的实例
   */
  static forAll(path: string) {
    return new StaticEntityEndpoints(path, path);
  }
}

/**
 * 实体资源的封装，这里的'Static'表示，它对应的Api路径在整个生命周期中是不变的，例如`/api/courses`。
 * 它同时包含与更新实体数据有关的逻辑，以及一些用于表示操作状态的`Observable`
 *
 * 注意，它是{@link RxState}的子类，这意味着它在封装实体数据的同时，向外界提供了强大的操作能力
 *
 * @example
 * // 声明我们实体数据的承载类
 * class User {
 *   name: string;
 *   nickname: string;
 *   email: string;
 *   role: UserRole; // 嵌套其他类
 *
 *   // 美妙的是，利用类，我们可以封装有用的方法，简化代码
 *   getDisplayName() {
 *     return `${this.nickname} (${this.name})`;
 *   }
 * }
 * // 通过DI注入ApiEntity<User>
 * private userEntity!: ApiEntity<User>;
 * // 尽情地使用，注意ApiEntity<T>是RxState<T>的子类
 * readonly name$ = this.state.connect(this.userEntity.select('name'));
 *
 * @template T
 */
export class StaticApiEntity<T extends ApiResponseBody> extends RxState<T> {
  private readonly getStream = new AsyncRequestStream<HttpParams | undefined, T>((params) =>
    this.dataApiAccessService.getAsSharedStateStream(
      {
        path: this.configuration.endpoints.getPath,
        params
      },
      this.configuration.typeConstructor
    )
  );

  /**
   * 一个反映此实体当前进行的GET请求动作的状态的流，注意它具有重放机制，重放个数为1
   *
   * 对于一个刚刚初始化的异步动作流，它默认会释放一个`isIdle === true`的状态对象
   *
   * 参见{@link AsyncRequestState}
   *
   * @see AsyncRequestState
   */
  readonly get$ = this.getStream.state$;

  /**
   * @internal
   * @ignore
   */
  constructor(
    private readonly dataApiAccessService: DataApiAccessService,
    private readonly configuration: ApiEntityConfiguration<ApiResponseBodyTypeConstructor<T>, StaticEntityEndpoints>
  ) {
    super();
    this.connect(this.getStream.response$);
  }

  /**
   * 向这个实体对应的REST Api Endpoint发出GET请求
   *
   * 注意，这是一个同步方法，既不返回`Observable`，也不返回`Promise`，请求是否完成或者是否发生错误会被同步到{@link get$}
   *
   * @param {HttpParams} params 请求参数
   */
  doGet(params?: HttpParams) {
    this.getStream.invoke(params);
  }

  /**
   * 销毁此对象，这会释放所有的异步动作流，包括对他们持有的{@link Subject}进行`complete()`操作
   */
  destroy() {
    this.getStream.destroy();
  }
}

export class RouteBasedEntityEndpoints {
  constructor(readonly provideEndpoints: (params: ParamMap) => StaticEntityEndpoints) {}
}

export class RouteBasedApiEntity<T extends ApiResponseBody> extends RxState<T> {
  private readonly latestEndpoints$: Observable<StaticEntityEndpoints>;

  private readonly doGetOnRouteUpdateSubscription: Subscription;

  private readonly getStream = new AsyncRequestStream<HttpParams | undefined, T>((params) =>
    combineLatest([this.latestEndpoints$]).pipe(
      switchMap(([endpoints]) =>
        this.dataApiAccessService.getAsSharedStateStream(
          {
            path: endpoints.getPath,
            params
          },
          this.configuration.typeConstructor
        )
      )
    )
  );

  /**
   * 一个反映此实体当前进行的GET请求动作的状态的流，注意它具有重放机制，重放个数为1
   *
   * 对于一个刚刚初始化的异步动作流，它默认会释放一个`isIdle === true`的状态对象
   *
   * 参见{@link AsyncRequestState}
   *
   * @see AsyncRequestState
   */
  readonly get$ = this.getStream.state$;

  constructor(
    private readonly dataApiAccessService: DataApiAccessService,
    private readonly configuration: ApiEntityConfiguration<
      ApiResponseBodyTypeConstructor<T>,
      RouteBasedEntityEndpoints
    >,
    private readonly targetRouteUpdate$: Observable<ActivatedRouteSnapshot>
  ) {
    super();
    this.latestEndpoints$ = this.targetRouteUpdate$.pipe(
      distinctUntilChanged(),
      map((snapshot) => snapshot.paramMap),
      map((paramMap) => this.configuration.endpoints.provideEndpoints(paramMap)),
      shareReplay(1)
    );
    this.doGetOnRouteUpdateSubscription = this.latestEndpoints$.subscribe(() => this.doGet());
  }

  /**
   * 向这个实体对应的REST Api Endpoint发出GET请求
   *
   * 注意，这是一个同步方法，既不返回`Observable`，也不返回`Promise`，请求是否完成或者是否发生错误会被同步到{@link get$}
   *
   * @param {HttpParams} params 请求参数
   */
  doGet(params?: HttpParams) {
    this.getStream.invoke(params);
  }

  /**
   * 销毁此对象，这会释放所有的异步动作流，包括对他们持有的{@link Subject}进行`complete()`操作
   */
  destroy() {
    this.doGetOnRouteUpdateSubscription.unsubscribe();
    this.getStream.destroy();
  }
}
