import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-student-frame',
  templateUrl: './student-frame.component.html',
  styleUrls: ['./student-frame.component.css']
})
export class StudentFrameComponent {}
