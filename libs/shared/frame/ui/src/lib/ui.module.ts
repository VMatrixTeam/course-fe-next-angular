import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppNavItemsDirective } from './app-nav-items.directive';
import { TopbarButtonComponent } from './topbar-button/topbar-button.component';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RippleModule, RouterModule],
  declarations: [AppNavItemsDirective, TopbarButtonComponent],
  exports: [AppNavItemsDirective, TopbarButtonComponent]
})
export class UiModule {}
