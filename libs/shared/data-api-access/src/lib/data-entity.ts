import { HttpParams } from '@angular/common/http';
import { RxState } from '@rx-angular/state';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, mapTo, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { DataApiAccessService, ObjectType, ObjectTypeConstructor } from './data-api-access.service';

/**
 * 封装异步动作流的状态
 */
export class AsyncActionStreamStatus {
  /**
   * 表示异步动作流当前有动作正在进行
   */
  readonly isActive: boolean;

  /**
   * 表示异步动作流当前没有动作正在进行，且上一次进行的动作失败
   */
  readonly isErrored: boolean;

  /**
   * 表示异步动作流当前没有动作正在进行
   */
  readonly isIdle: boolean;

  /**
   * @ignore
   * @internal
   */
  constructor(active: boolean, readonly error?: any) {
    this.isActive = active;
    this.isErrored = !active && !!error;
    this.isIdle = !active;
  }
}

/**
 * @internal
 * @ignore
 */
class AsyncActionStream<T, U extends ObjectType> {
  private readonly invoker = new Subject<T>();

  readonly responseEntity$: Observable<U>;

  readonly status$: Observable<AsyncActionStreamStatus>;

  constructor(switchMapper: (data: T) => Observable<U>) {
    const request$ = this.invoker.pipe(switchMap(switchMapper));
    this.responseEntity$ = request$.pipe(shareReplay(1));
    this.status$ = merge(
      this.invoker.pipe(mapTo(new AsyncActionStreamStatus(true))),
      request$.pipe(
        mapTo(new AsyncActionStreamStatus(false)),
        catchError((err) => of(new AsyncActionStreamStatus(false, err)))
      )
    ).pipe(startWith(new AsyncActionStreamStatus(false)), shareReplay(1));
  }

  invoke(params: T) {
    this.invoker.next(params);
  }

  destroy() {
    this.invoker.complete();
  }
}

/**
 * 表示在给定的HTTP方法下，实体对应的REST Api Endpoint地址，不需要带任何像`/api`这样的前缀
 *
 * @example
 * const myEndpoints = DataEntityEndpoints.forAll('user')
 */
export class DataEntityEndpoints {
  constructor(readonly getPath: string, readonly postPath: string) {}

  /**
   * 向GET、POST、DELETE、PUT方法应用同一个路径，以构造这样的`DataEntityEndpoints`对象
   *
   * @param {string} path 路径
   * @returns {DataEntityEndpoints} GET、POST、DELETE、PUT方法都对应同一个路径的实例
   */
  static forAll(path: string) {
    return new DataEntityEndpoints(path, path);
  }
}

/**
 * 实体类的配置
 *
 * @template T
 */
export class DataEntityConfiguration<T extends ObjectTypeConstructor<any>> {
  /**
   * 表示此实体对应的数据类型的构造器，参见{@link ObjectTypeConstructor}
   *
   * @see ObjectTypeConstructor
   */
  readonly typeConstructor!: T;

  /**
   * 表示此实体对应的REST Api Endpoint，参见{@link DataEntityEndpoints}
   *
   * @see DataEntityEndpoints
   */
  readonly endpoints!: DataEntityEndpoints;
}

/**
 * 实体资源的封装，不仅包含实体数据，同时包含与更新实体数据有关的逻辑，以及一些用于表示操作状态的`Observable`
 *
 * 注意，它是`RxState`的子类，这意味着它在封装实体数据的同时，向外界提供了强大的操作能力
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
 * // 通过DI注入DataEntity<User>
 * private userEntity!: DataEntity<User>;
 * // 尽情地使用，注意DataEntity<T>是RxState<T>的子类
 * readonly name$ = this.state.connect(this.userEntity.select('name'));
 *
 * @template T
 */
export class DataEntity<T extends ObjectType> extends RxState<T> {
  private readonly getStream = new AsyncActionStream<HttpParams | undefined, T>((params) =>
    this.dataApiAccessService.get({
      path: this.configuration.endpoints.getPath,
      params,
      responseType: this.configuration.typeConstructor
    })
  );

  private readonly postStream = new AsyncActionStream<[payload?: ObjectType, params?: HttpParams], T>(
    ([payload, params]) =>
      this.dataApiAccessService.post({
        path: this.configuration.endpoints.getPath,
        params,
        responseType: this.configuration.typeConstructor,
        payload
      })
  );

  /**
   * 一个反映此实体当前进行的GET请求动作的状态的流，注意它具有重放机制，重放个数为1
   *
   * 对于一个刚刚初始化的异步动作流，它默认会释放一个`isIdle === true`的状态对象
   *
   * 参见{@link AsyncActionStreamStatus}
   *
   * @see AsyncActionStreamStatus
   */
  readonly get$ = this.getStream.status$;

  /**
   * 一个反映此实体当前进行的POST请求动作的状态的流，注意它具有重放机制，重放个数为1
   *
   * 对于一个刚刚初始化的异步动作流，它默认会释放一个`isIdle === true`的状态对象
   *
   * 参见{@link AsyncActionStreamStatus}
   *
   * @see AsyncActionStreamStatus
   */
  readonly post$ = this.postStream.status$;

  /**
   * @internal
   * @ignore
   */
  constructor(
    private readonly dataApiAccessService: DataApiAccessService,
    private readonly configuration: DataEntityConfiguration<ObjectTypeConstructor<T>>
  ) {
    super();
    this.connect(this.getStream.responseEntity$);
    this.connect(this.postStream.responseEntity$);
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
   * 向这个实体对应的REST Api Endpoint发出POST请求
   *
   * 注意，这是一个同步方法，既不返回`Observable`，也不返回`Promise`，请求是否完成或者是否发生错误会被同步到{@link post$}
   *
   * @param {ObjectType} payload 请求体内容
   * @param {HttpParams} params 请求参数
   */
  doPost(payload?: ObjectType, params?: HttpParams) {
    this.postStream.invoke([payload, params]);
  }

  /**
   * 销毁此对象，这会释放所有的异步动作流，包括对他们持有的{@link Subject}进行`complete()`操作
   */
  destroy() {
    this.getStream.destroy();
    this.postStream.destroy();
  }
}
