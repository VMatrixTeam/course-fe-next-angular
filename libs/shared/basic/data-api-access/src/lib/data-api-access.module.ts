import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule]
})
export class DataApiAccessModule {}
