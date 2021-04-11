import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataApiAccessService } from '@course-fe-next/shared/basic/data-api-access';
import { catchError } from 'rxjs/operators';
import { User } from './user.schema';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataUserService implements Resolve<User | null> {
  constructor(
    @Inject('app.environment') private readonly isProductionEnvironment: boolean,
    private readonly dataApiAccessService: DataApiAccessService
  ) {}

  resolve() {
    // if the user is not logged in, GET users/login will results in a response with data: {},
    // which will drive JsonConvert into errors, then we capture it and return null
    return this.dataApiAccessService.get({ path: 'users/login' }, User).pipe(catchError(() => of(null)));
  }
}
