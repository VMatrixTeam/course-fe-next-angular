import { FactoryProvider, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApiResponseBodyTypeConstructor,
  DataApiAccessService,
  RouteBasedApiEntity,
  RouteBasedEndpointsProvider
} from '@course-fe-next/shared/data-api-access';

/**
 * 工具方法
 *
 * @template T
 * @param {InjectionToken} token
 * @param {T} typeConstructor
 * @param {RouteBasedEndpointsProvider} endpointsProvider
 * @returns {FactoryProvider} 对应的Provider
 */
export function provideRouteBasedApiEntity<T extends ApiResponseBodyTypeConstructor<any>>(
  token: InjectionToken<any>,
  typeConstructor: T,
  endpointsProvider: RouteBasedEndpointsProvider
): FactoryProvider {
  return {
    provide: token,
    useFactory: (dataApiAccessService: DataApiAccessService, router: Router) => {
      return new RouteBasedApiEntity(dataApiAccessService, router, {
        typeConstructor,
        endpointsProvider
      });
    },
    deps: [DataApiAccessService, Router]
  };
}
