import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppGetHumanFriendlyMessagePipe } from './app-get-human-friendly-message.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AppGetHumanFriendlyMessagePipe],
  exports: [AppGetHumanFriendlyMessagePipe]
})
export class UtilPipeModule {}
