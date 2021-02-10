import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
// FIXME: typescript-eslint bug here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AsyncRequestState } from '@course-fe-next/shared/data-api-access';
import { delayLoadingState } from '@course-fe-next/shared/util-etc';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-async-button',
  templateUrl: './async-button.component.html',
  styleUrls: ['./async-button.component.css']
})
export class AsyncButtonComponent implements OnInit {
  @Input()
  text!: string;

  @Input()
  requestState!: Observable<AsyncRequestState<any>>;

  @Input()
  buttonClasses!: string;

  @Input()
  noLoadingStateDelay = false;

  requestState$!: Observable<AsyncRequestState<any>>;

  ngOnInit() {
    if (this.noLoadingStateDelay) {
      this.requestState$ = this.requestState;
    } else {
      this.requestState$ = this.requestState.pipe(delayLoadingState());
    }
  }
}
