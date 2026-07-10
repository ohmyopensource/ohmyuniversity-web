import { Component, Input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideChartLine } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardCareerStatsService } from 'src/app/features/dashboard/services/dashboard-career-stats.service';

@Component({
  selector: 'app-career-arithmetic-avg-widget',
  standalone: true,
  imports: [CustomTextComponent, CustomLinkComponent, DashboardWidgetCardComponent],
  templateUrl: './career-arithmetic-avg.widget.html',
})
export class CareerArithmeticAvgWidgetComponent {
  @Input() size: WidgetSize = 'small';
  private readonly careerStats = inject(DashboardCareerStatsService);

  readonly stats = toSignal(this.careerStats.stats$);
  readonly lucideChart = LucideChartLine;
}
