import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retryBackoff, RetryBackoffConfig } from 'backoff-rxjs';
import { JsonConvert } from 'json2typescript';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

/**
 * 表示对象类型，它的键值均为`string`类型，因此适合与JSON Object**相互**转换
 */
export type ObjectType = Record<string, unknown>;

/**
 * 表示构造函数，其中`T`表示构造函数的返回值，必须符合{@link ObjectType}
 *
 * 除了可以是我们自己用`class`声明出来的构造函数之外，
 * 还可以是ES原生类型：`String`、`Number`、`Boolean`等，注意开头大写
 *
 * @template T
 * @see {@link ObjectType}
 */
export type ObjectTypeConstructor<T extends ObjectType> = new (...args: any[]) => T;

/**
 * 包装请求参数的对象的基础接口，T见{@link ObjectTypeConstructor}
 */
export interface BaseParameters<T extends ObjectType> {
  /**
   * 请求路径
   *
   * **不能**以`/`开头，**不需要**带上像`/api`这样的前缀
   */
  path: string;

  /**
   * 附着于URL的请求参数，具体见{@link HttpParams}
   *
   * @see {@link HttpParams}
   */
  params?: HttpParams;

  /**
   * 期望的响应体JSON对应的`class`类型，不能使用`interface`或者`type`，因为它们会在编译后消失
   *
   * 通过给定这样的一个类型，`DataApiAccessService`得以在进行GET等请求时通过使用`json2typescript`对响应体进行序列化，
   * 进而在序列化的过程中我们可以利用后者对响应做出必要的修改
   *
   * 当它为`undefined`时表示这个请求对应的响应的响应体为空，或者使用者不关心响应体的内容如何
   *
   * @example
   * class MyData {
   *   id!: number;
   *   name!: string;
   * }
   * 此时即可令responseType为MyData
   *
   * @see {@link TypeConstructor}
   */
  responseType?: ObjectTypeConstructor<T>;

  /**
   * 表示此请求期望在多少秒没有收到响应时算作失败，默认值见{@link DEFAULT_CONNECTION_TIMEOUT_MS}
   */
  timeoutMs?: number;
}

/**
 * 包装GET请求的请求参数的对象接口
 */
export interface GetParameters<T extends ObjectType> extends BaseParameters<T> {
  /**
   * 指数退避重试配置，见{@link RetryBackoffConfig}
   *
   * 默认值见{@link DEFAULT_RETRY_BACKOFF_CONFIG}
   */
  retryConfig?: RetryBackoffConfig;
}

/**
 * 包装DELETE请求的请求参数的对象接口
 */
export interface DeleteParameters<T extends ObjectType> extends BaseParameters<T> {}

/**
 * 包装POST请求的请求参数的对象接口
 */
export interface PostParameters<T extends ObjectType> extends BaseParameters<T> {
  /**
   * 请求体的内容，必须为对象类型，但可以为空，表示对应的请求的请求体为空
   */
  payload?: ObjectType;
}

/**
 * 包装PUT请求的请求参数的对象接口
 */
export interface PutParameters<T extends ObjectType> extends PostParameters<T> {}

/**
 * 默认的请求超时时间，单位为毫秒
 */
export const DEFAULT_CONNECTION_TIMEOUT_MS = 8000;

/**
 * 默认的指数退避重试参数
 */
export const DEFAULT_RETRY_BACKOFF_CONFIG: RetryBackoffConfig = {
  initialInterval: 0,
  maxRetries: 3,
  resetOnSuccess: true
};

/**
 * 默认的服务端API端点前缀
 */
export const API_ENDPOINT_PREFIX = '/api';

/**
 * 根据API相对路径获取绝对路径
 *
 * @example
 * // 获得login对应的绝对路径，以供XHR使用
 * toAbsoluteApiPath('login')
 *
 * @param {string} path API相对路径
 * @returns {string} 绝对路径
 */
export function toAbsoluteApiPath(path: string) {
  return `${API_ENDPOINT_PREFIX}/${path}`;
}

@Injectable({ providedIn: 'root' })
export class DataApiAccessService {
  private readonly jsonConvert = new JsonConvert();

  /**
   * @internal
   * @ignore
   */
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * 执行 HTTP GET 请求
   *
   * @template T
   * @param {GetParameters<T>} parameters 请求参数
   * @returns {Observable<T>} 其中`T`为服务端响应内容的类型，若输入的请求参数中没有指定`responseType`，则`T`为`unknown`，即忽略响应内容
   */
  get<T extends ObjectType>(parameters: GetParameters<T>): Observable<T> {
    const aggregated = {
      params: new HttpParams(),
      timeoutMs: DEFAULT_CONNECTION_TIMEOUT_MS,
      retryConfig: DEFAULT_RETRY_BACKOFF_CONFIG,
      ...parameters
    };
    return this.handleApiAccess(
      this.httpClient.get<T>(toAbsoluteApiPath(aggregated.path), { params: aggregated.params }),
      aggregated.timeoutMs
    ).pipe(retryBackoff(aggregated.retryConfig));
  }

  /**
   * 执行 HTTP POST 请求
   *
   * @template T
   * @param {PostParameters<T>} parameters 请求参数
   * @returns {Observable<T>} 其中`T`为服务端响应内容的类型，若输入的请求参数中没有指定`responseType`，则`T`为`unknown`，即忽略响应内容
   */
  post<T extends ObjectType>(parameters: PostParameters<T>): Observable<T> {
    const aggregated = {
      params: new HttpParams(),
      timeoutMs: DEFAULT_CONNECTION_TIMEOUT_MS,
      retryConfig: DEFAULT_RETRY_BACKOFF_CONFIG,
      ...parameters
    };
    return this.handleApiAccess(
      this.httpClient.post<T>(toAbsoluteApiPath(aggregated.path), aggregated.payload, {
        params: aggregated.params
      }),
      aggregated.timeoutMs
    );
  }

  private handleApiAccess<T extends ObjectType>(
    request: Observable<T>,
    timeoutMs: number,
    responseType?: ObjectTypeConstructor<T>
  ) {
    return request.pipe(
      timeout(timeoutMs),
      map((response) => (!responseType ? response : this.jsonConvert.deserializeObject(response, responseType)))
    );
  }
}
