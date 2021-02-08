import { FactoryProvider, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApiResponseBodyTypeConstructor,
  ConstantApiEntity,
  ConstantEndpointsProvider,
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
 * @param {string} path
 * @returns {FactoryProvider} 对应的Provider
 */
export function provideConstantApiEntity<T extends ApiResponseBodyTypeConstructor<any>>(
  token: InjectionToken<any>,
  typeConstructor: T,
  path: string
): FactoryProvider {
  return {
    provide: token,
    useFactory: (dataApiAccessService: DataApiAccessService) =>
      new ConstantApiEntity(dataApiAccessService, {
        typeConstructor,
        endpointsProvider: ConstantEndpointsProvider.forAll(path)
      }),
    deps: [DataApiAccessService]
  };
}

/**
 * 工具方法
 *
 * @template T
 * @param {InjectionToken} token
 * @param {T} typeConstructor
 * @param {RegExp | string} pathRegex
 * @param {(params: string[]) => ConstantEndpointsProvider | string} endpointsProviderFunction
 * @returns {FactoryProvider} 对应的Provider
 */
export function provideRouteBasedApiEntity<T extends ApiResponseBodyTypeConstructor<any>>(
  token: InjectionToken<any>,
  typeConstructor: T,
  pathRegex: RegExp | string,
  endpointsProviderFunction: (params: string[]) => ConstantEndpointsProvider | string
): FactoryProvider {
  return {
    provide: token,
    useFactory: (dataApiAccessService: DataApiAccessService, router: Router) =>
      new RouteBasedApiEntity(dataApiAccessService, router, {
        typeConstructor,
        endpointsProvider: new RouteBasedEndpointsProvider(pathRegex, endpointsProviderFunction)
      }),
    deps: [DataApiAccessService, Router]
  };
}
