import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-topbar-button',
  templateUrl: './topbar-button.component.html',
  styleUrls: ['./topbar-button.component.css']
})
export class TopbarButtonComponent {
  @Input()
  link?: string;

  @Input()
  extraClass = '';
}
