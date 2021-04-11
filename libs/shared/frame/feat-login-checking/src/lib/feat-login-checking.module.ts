import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginCheckingComponent } from './login-checking/login-checking.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LoginCheckingComponent],
  exports: [LoginCheckingComponent]
})
export class FeatLoginCheckingModule {}
