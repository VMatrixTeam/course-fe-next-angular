import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataApiAccessModule } from '@course-fe-next/shared/basic/data-api-access';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from './app.component';
import { FeatCoreModule } from '@course-fe-next/student/feat-core';
import { PRODUCTION_ENVIRONMENT } from '@course-fe-next/shared/basic/util-etc';
// eslint-disable-next-line import/no-relative-parent-imports
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, DataApiAccessModule, RouterModule, FeatCoreModule],
  providers: [
    {
      provide: PRODUCTION_ENVIRONMENT,
      useValue: environment.production
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }
}
