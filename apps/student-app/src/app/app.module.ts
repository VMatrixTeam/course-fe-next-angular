import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataApiAccessModule } from '@course-fe-next/shared/data-api-access';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    DataApiAccessModule,
    ButtonModule,
    RippleModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }
}
