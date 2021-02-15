import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataApiAccessModule } from '@course-fe-next/shared/data-api-access';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from './app.component';
import { FeatCoreModule } from '@course-fe-next/student/feat-core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, DataApiAccessModule, RouterModule, FeatCoreModule],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }
}
