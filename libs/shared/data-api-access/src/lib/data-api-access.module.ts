import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DataApiAccessService } from './data-api-access.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [DataApiAccessService]
})
export class DataApiAccessModule {}
