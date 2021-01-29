import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataApiAccessService } from './data-api-access.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [DataApiAccessService]
})
export class DataApiAccessModule {}
