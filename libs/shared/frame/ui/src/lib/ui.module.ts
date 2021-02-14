import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppNavItemsDirective } from './app-nav-items.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AppNavItemsDirective],
  exports: [AppNavItemsDirective]
})
export class UiModule {}
