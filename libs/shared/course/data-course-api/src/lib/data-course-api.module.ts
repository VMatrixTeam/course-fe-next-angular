import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { DataApiAccessModule, RouteBasedApiEntity } from '@course-fe-next/shared/data-api-access';
import { provideRouteBasedApiEntity } from '@course-fe-next/shared/util-etc';
import { CourseAssignmentList } from './course-assignment-list.schema';

export const COURSE_ASSIGNMENT_ENTITY = new InjectionToken<RouteBasedApiEntity<CourseAssignmentList>>(
  'app.entity.course_assignment'
);

@NgModule({
  imports: [CommonModule, DataApiAccessModule],
  providers: [
    provideRouteBasedApiEntity(
      COURSE_ASSIGNMENT_ENTITY,
      CourseAssignmentList,
      '/course/(.*?)/assignments',
      ([courseId]) => `/course/${courseId}/assignments`
    )
  ]
})
export class DataCourseApiModule {}
