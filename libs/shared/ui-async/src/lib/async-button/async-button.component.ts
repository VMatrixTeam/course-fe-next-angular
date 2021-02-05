import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// FIXME: typescript-eslint bug here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AsyncActionStreamStatus } from '@course-fe-next/shared/data-api-access';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-async-button',
  templateUrl: './async-button.component.html',
  styleUrls: ['./async-button.component.css']
})
export class AsyncButtonComponent {
  @Input()
  text!: string;

  @Input()
  streamStatus!: Observable<AsyncActionStreamStatus>;

  @Input()
  buttonClasses!: string;
}
