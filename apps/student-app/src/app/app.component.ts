import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@UntilDestroy()
export class AppComponent {
  constructor(private readonly primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }
}
