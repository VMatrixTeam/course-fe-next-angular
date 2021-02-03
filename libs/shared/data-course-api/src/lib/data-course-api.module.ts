import { NgModule } from '@angular/core';
import { DataApiAccessModule } from '@course-fe-next/shared/data-api-access';

@NgModule({
  imports: [DataApiAccessModule],
  exports: [DataApiAccessModule]
})
export class DataCourseApiModule {}
