import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameComponent } from './frame/frame.component';
import { UiModule } from '@course-fe-next/shared/frame/ui';

@NgModule({
  imports: [CommonModule, RouterModule, UiModule],
  declarations: [FrameComponent],
  exports: [FrameComponent]
})
export class FeatModule {}
