import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { DataApiAccessService } from '@course-fe-next/shared/basic/data-api-access';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login-checking',
  templateUrl: './login-checking.component.html',
  styleUrls: ['./login-checking.component.css']
})
export class LoginCheckingComponent {
  showDevLogin = false;

  @ViewChild('username', { read: ElementRef })
  usernameRef!: ElementRef<HTMLInputElement>;

  @ViewChild('password', { read: ElementRef })
  passwordRef!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly dataApiAccessService: DataApiAccessService,
    route: ActivatedRoute,
    @Inject('app.environment') isProductionEnvironment: boolean
  ) {
    if (!route.snapshot.data.user) {
      if (isProductionEnvironment) {
        window.location.href = '/login';
      } else {
        this.showDevLogin = true;
      }
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.dataApiAccessService
      .post({
        path: 'users/login',
        payload: {
          username: this.usernameRef.nativeElement.value,
          password: this.passwordRef.nativeElement.value
        }
      })
      .subscribe(() => {
        window.location.href = '/';
      });
  }
}
