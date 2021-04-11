import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataApiAccessService } from '@course-fe-next/shared/basic/data-api-access';
import { map } from 'rxjs/operators';
import { User } from './user.schema';
import { PRODUCTION_ENVIRONMENT } from '@course-fe-next/shared/basic/util-etc';

@Injectable({ providedIn: 'root' })
export class DataUserService implements Resolve<User> {
  constructor(
    @Inject(PRODUCTION_ENVIRONMENT) private readonly isProductionEnvironment: boolean,
    private readonly dataApiAccessService: DataApiAccessService
  ) {}

  resolve() {
    return this.dataApiAccessService.get({ path: 'users/login' }, User).pipe(
      map((user) => {
        if (!user.userId) {
          this.redirectToLoginApp();
        }
        return user;
      })
    );
  }

  private redirectToLoginApp() {
    if (this.isProductionEnvironment) {
      // TODO
      window.location.href = '/login';
    } else {
      window.location.href = '/login';
    }
  }
}
