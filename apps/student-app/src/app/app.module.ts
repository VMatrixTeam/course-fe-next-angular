// eslint-disable-next-line import/no-relative-parent-imports
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataApiAccessModule, HttpCsrfInterceptor } from '@course-fe-next/shared/basic/data-api-access';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from './app.component';
import { FeatCoreModule } from '@course-fe-next/student/feat-core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, DataApiAccessModule, RouterModule, FeatCoreModule],
  providers: [
    {
      provide: 'app.environment',
      useValue: environment.production
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCsrfInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }
}
