/**
 * 异步动作的状态类型，只有三种状态
 */
export type AsyncActionStateType = 'loading' | 'error' | 'completed';

/**
 * 封装异步动作的状态，仅当`type`为`error`时，`error`值才会被给定
 */
export class AsyncActionState {
  constructor(readonly type: AsyncActionStateType, readonly error?: any) {}
}
