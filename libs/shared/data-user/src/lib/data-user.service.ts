import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataApiAccessService } from '@course-fe-next/shared/data-api-access';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user.schema';

export interface CheckUserLoginStateResult {
  isLoggedIn: boolean;
  error?: Error;
  user?: User;
}

@Injectable({ providedIn: 'root' })
export class DataUserService implements Resolve<CheckUserLoginStateResult> {
  constructor(private readonly dataApiAccessService: DataApiAccessService) {}

  resolve() {
    return this.dataApiAccessService.get({ path: 'user/login' }, User).pipe(
      map((user) => ({ isLoggedIn: true, user })),
      catchError((error) => of({ isLoggedIn: false, error }))
    );
  }
}
