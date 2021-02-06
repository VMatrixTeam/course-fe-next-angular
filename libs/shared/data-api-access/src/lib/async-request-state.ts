/**
 * 封装一次异步请求的状态
 */
export class AsyncRequestState<R> {
  /**
   * 表示异步请求正在进行
   */
  readonly loading: boolean;

  /**
   * 表示异步请求结束且失败
   */
  readonly failed: boolean;

  /**
   * 表示失败的异步请求相关的`Error`对象
   */
  readonly error?: Error;

  /**
   * 表示异步请求成功结束
   */
  readonly completed: boolean;

  /**
   * 表示异步请求的响应
   */
  readonly responseObject?: R;

  /**
   * @ignore
   * @internal
   */
  constructor({ loading, error, responseObject }: { loading: boolean; error?: Error; responseObject?: R }) {
    this.loading = loading;
    this.failed = !loading && !!error;
    this.error = error;
    this.completed = !loading;
    this.responseObject = responseObject;
  }
}
