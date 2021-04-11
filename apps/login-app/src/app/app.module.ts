import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatLoginModule } from '@course-fe-next/login/feat';
import { AppComponent } from './app.component';
import { PRODUCTION_ENVIRONMENT } from '@course-fe-next/shared/basic/util-etc';
// eslint-disable-next-line import/no-relative-parent-imports
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatLoginModule],
  providers: [
    {
      provide: PRODUCTION_ENVIRONMENT,
      useValue: environment.production
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
