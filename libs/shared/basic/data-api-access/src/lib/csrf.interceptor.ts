import { ɵparseCookieValue as parseCookieValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { DataApiAccessService } from './data-api-access.service';
import { switchMap } from 'rxjs/operators';

const CSRF_COOKIE_NAME = 'X-CSRF-Token';
const CSRF_HEADER_NAME = 'X-CSRF-Token';

@Injectable({ providedIn: 'root' })
export class HttpCsrfInterceptor implements HttpInterceptor {
  private lastCookieString = '';

  private lastToken: string | null = null;

  constructor(private readonly dataApiAccessService: DataApiAccessService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const urlInLowercase = request.url.toLowerCase();

    if (
      request.method === 'GET' ||
      request.method === 'HEAD' ||
      urlInLowercase.startsWith('http://') ||
      urlInLowercase.startsWith('https://')
    ) {
      return next.handle(request);
    }

    return this.nextWithToken(request, next);
  }

  private nextWithToken(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.getCookieToken();
    if (token) {
      return this.dataApiAccessService
        .getSimple({ path: 'users/login' })
        .pipe(switchMap(() => next.handle(this.requestWithToken(request, this.getCookieToken()))));
    }
    return next.handle(this.requestWithToken(request, token));
  }

  private getCookieToken() {
    const cookieString = document.cookie || '';
    if (cookieString !== this.lastCookieString) {
      this.lastToken = parseCookieValue(cookieString, CSRF_COOKIE_NAME);
      this.lastCookieString = cookieString;
    }
    return this.lastToken;
  }

  private requestWithToken(request: HttpRequest<any>, token: string | null) {
    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !request.headers.has(CSRF_HEADER_NAME)) {
      return request.clone({ headers: request.headers.set(CSRF_HEADER_NAME, token) });
    }
    return request;
  }
}
