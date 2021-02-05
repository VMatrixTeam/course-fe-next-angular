import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-async-skeleton',
  templateUrl: './async-skeleton.component.html',
  styleUrls: ['./async-skeleton.component.css']
})
export class AsyncSkeletonComponent {

}
