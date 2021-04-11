import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFrameComponent } from './student-frame/student-frame.component';
import { FeatModule } from '@course-fe-next/shared/frame/feat';
import { UiModule } from '@course-fe-next/shared/frame/ui';
import { DataUserService } from '@course-fe-next/shared/basic/data-user';
import { LoginCheckingComponent } from '@course-fe-next/shared/frame/feat-login-checking';

const routes: Routes = [
  {
    path: '',
    component: LoginCheckingComponent,
    resolve: {
      user: DataUserService
    },
    children: [
      {
        path: '',
        component: StudentFrameComponent,
        outlet: 'main',
        children: []
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    FeatModule,
    UiModule
  ],
  declarations: [StudentFrameComponent]
})
export class FeatCoreModule {}
