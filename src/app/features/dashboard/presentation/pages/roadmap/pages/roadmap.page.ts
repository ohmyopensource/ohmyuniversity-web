import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LucideTriangleAlert } from '@lucide/angular';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { MagistraliAffiniComponent } from '../components/magistrali-affini/magistrali-affini.component';

@Component({
  selector: 'app-roadmap-page',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CardStatusComponent,
    MagistraliAffiniComponent,
  ],
  templateUrl: './roadmap.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapPage {
  readonly lucideAlertTriangle = LucideTriangleAlert;
}
