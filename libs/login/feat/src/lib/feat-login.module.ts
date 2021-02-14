import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataUserService } from '@course-fe-next/shared/data-user';
import { AuthCheckingComponent } from './auth-checking/auth-checking.component';
import { LoginEntryComponent } from './login-entry/login-entry.component';
import { LoginPortalComponent } from './login-portal/login-portal.component';

const routes: Routes = [
  {
    path: '',
    component: AuthCheckingComponent,
    resolve: {
      loginState: DataUserService
    },
    children: [
      {
        path: 'portal',
        pathMatch: 'full',
        outlet: 'sub',
        component: LoginPortalComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [AuthCheckingComponent, LoginEntryComponent, LoginPortalComponent],
  exports: [RouterModule, AuthCheckingComponent, LoginEntryComponent]
})
export class FeatLoginModule {}
