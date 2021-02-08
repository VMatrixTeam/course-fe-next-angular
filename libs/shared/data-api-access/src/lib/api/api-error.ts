import { ApiResponse } from './api-response';

/**
 * 表示封装了{@link ApiResponse}作为`apiError`属性的`Error`对象
 *
 * 为了泛用性和兼容性考虑，在前端项目中我们只传递Error对象作为错误对象
 *
 * 例如，对于{@link DataApiAccessService}而言，它会将遇到的Api报错封装到抛出的`Error`对象中
 */
export class EncapsulatedApiError extends Error {
  constructor(readonly apiErrorResponse: ApiResponse) {
    super();
  }
}

/**
 * 检测某个`Error`对象是否封装了{@link ApiResponse}
 *
 * @param {Error} error `Error`对象
 * @returns {boolean} 给定的`Error`对象是否封装了{@link ApiResponse}
 */
export function isEncapsulatedApiError(error: Error): error is EncapsulatedApiError {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return 'apiErrorResponse' in error && (error as any).apiErrorResponse instanceof ApiResponse;
}
