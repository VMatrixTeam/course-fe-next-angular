import { AsyncRequestState } from '@course-fe-next/shared/basic/data-api-access';
import { iif, Observable, of, OperatorFunction } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

/**
 * 当且仅当异步请求从空到loading以及从完成到loading时，延迟对loading状态的释放
 *
 * 这对于改善UX有一定帮助，对于那些很短时间内就能加载出来的页面，我们不需要展示spinner、skeleton等元素，因为这样反而会造成闪屏
 *
 * @template T
 * @param {number} durationMs 默认延迟对loading状态的释放的时间，单位为毫秒
 * @returns {OperatorFunction<AsyncRequestState<T>, AsyncRequestState<T>>} 实现该功能的operator function
 */
export function delayLoadingState<T>(durationMs = 300): OperatorFunction<AsyncRequestState<T>, AsyncRequestState<T>> {
  let previous: AsyncRequestState<T>;
  return (observable: Observable<AsyncRequestState<T>>) =>
    observable.pipe(
      switchMap((current) =>
        iif(
          () => (!previous || previous.completed) && current.loading,
          of(current).pipe(delay(durationMs)),
          of(current)
        )
      ),
      tap((current) => {
        previous = current;
      })
    );
}
