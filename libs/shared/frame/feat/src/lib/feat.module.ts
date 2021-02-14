import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrameComponent } from './frame/frame.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FrameComponent],
  exports: [FrameComponent]
})
export class FeatModule {}
