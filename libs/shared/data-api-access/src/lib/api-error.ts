// FIXME: a typescript-eslint bug
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { DataApiAccessService } from './data-api-access.service';

/**
 * 表示封装了{@link ApiError}作为`apiError`属性的`Error`对象
 *
 * 为了泛用性和兼容性考虑，在前端项目中我们只传递Error对象作为错误对象
 *
 * 例如，对于{@link DataApiAccessService}而言，它会将遇到的Api报错封装到抛出的`Error`对象中
 */
export interface EncapsulatedApiError extends Error {
  apiError: ApiError;
}

export class ApiError {
  simpleMessage!: string;
}

/**
 * 检测某个`Error`对象是否封装了{@link ApiError}
 *
 * @param {Error} error `Error`对象
 * @returns {boolean} 给定的`Error`对象是否封装了{@link ApiError}
 */
export function isEncapsulatedApiError(error: Error): error is EncapsulatedApiError {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Reflect.has(error, 'apiError') && (error as any).apiError instanceof ApiError;
}
