import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckUserLoginStateResult } from '@course-fe-next/shared/data-user';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-auth-checking',
  templateUrl: './auth-checking.component.html'
})
export class AuthCheckingComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  private checkRedirectParameter(param: string) {
    return /^\/[^/]+$/.test(param);
  }

  ngOnInit() {
    const result: CheckUserLoginStateResult = this.route.snapshot.data.loginState;
    if (!result.isLoggedIn) {
      this.router.navigate(['/portal'], { queryParamsHandling: 'preserve' });
    } else {
      const redirect = this.route.snapshot.queryParamMap.get('redirect');
      if (redirect && this.checkRedirectParameter(redirect)) {
        window.location.href = redirect;
      } else {
        // TODO
      }
    }
  }
}
