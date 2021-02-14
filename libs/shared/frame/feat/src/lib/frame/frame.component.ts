import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';
import { AppNavItemsDirective } from '@course-fe-next/shared/frame/ui';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent {
  @ContentChild(AppNavItemsDirective, { read: TemplateRef })
  navItems!: TemplateRef<any>;
}
