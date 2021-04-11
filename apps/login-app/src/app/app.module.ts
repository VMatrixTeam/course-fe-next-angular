import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatLoginModule } from '@course-fe-next/login/feat';
import { AppComponent } from './app.component';
// eslint-disable-next-line import/no-relative-parent-imports
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatLoginModule],
  providers: [
    {
      provide: 'app.environment',
      useValue: environment.production
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
