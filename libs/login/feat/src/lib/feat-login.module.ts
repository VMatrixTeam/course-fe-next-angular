import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataUserService } from '@course-fe-next/shared/basic/data-user';
import { LoginEntryComponent } from './login-entry/login-entry.component';
import { LoginPortalComponent } from './login-portal/login-portal.component';

const routes: Routes = [
  {
    path: '',
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
  declarations: [LoginEntryComponent, LoginPortalComponent],
  exports: [RouterModule, LoginEntryComponent]
})
export class FeatLoginModule {}
