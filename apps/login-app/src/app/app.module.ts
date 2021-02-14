import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatLoginModule } from '@course-fe-next/login/feat';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatLoginModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
