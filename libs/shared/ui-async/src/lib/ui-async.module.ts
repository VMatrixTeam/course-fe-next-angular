import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@rx-angular/template';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AsyncButtonComponent } from './async-button/async-button.component';
import { AsyncSkeletonComponent } from './async-skeleton/async-skeleton.component';
import { TooltipModule } from 'primeng/tooltip';
import { UtilPipeModule } from '@course-fe-next/shared/util-pipe';

@NgModule({
  imports: [CommonModule, ButtonModule, LetModule, RippleModule, TooltipModule, UtilPipeModule],
  declarations: [AsyncButtonComponent, AsyncSkeletonComponent]
})
export class UiAsyncModule {}
