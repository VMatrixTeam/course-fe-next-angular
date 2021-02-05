import { Pipe, PipeTransform } from '@angular/core';
import { EncapsulatedApiError, isEncapsulatedApiError } from '@course-fe-next/shared/data-api-access';

@Pipe({ name: 'appGetHumanFriendlyMessage', pure: true })
export class AppGetHumanFriendlyMessagePipe implements PipeTransform {
  transform(value: Error | EncapsulatedApiError | any) {
    if (value instanceof Error) {
      return isEncapsulatedApiError(value) ? value.apiError.simpleMessage : value.message;
    }
    return `${value}`;
  }
}
