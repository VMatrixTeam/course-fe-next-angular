import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFrameComponent } from './student-frame/student-frame.component';
import { FeatModule } from '@course-fe-next/shared/frame/feat';
import { UiModule } from '@course-fe-next/shared/frame/ui';

const routes: Routes = [
  {
    path: '',
    component: StudentFrameComponent,
    children: []
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
