import { Component, Input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideCalendarClock, LucideDownload, LucideExternalLink } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MyTimetablesService } from 'src/app/features/dashboard/services/my-timetables.service';
import {
  courseNameFromUrl,
  degreeTypeLabel,
  downloadScheduleFile,
} from '@shared/utils/timetable.utils';

@Component({
  selector: 'app-schedules-overview-widget',
  standalone: true,
  imports: [
    CustomButtonComponent,
    CustomBadgeComponent,
    CustomTextComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './schedules-overview.widget.html',
})
export class SchedulesOverviewWidgetComponent {
  @Input() size: WidgetSize = 'small';

  private readonly myTimetables = inject(MyTimetablesService);
  readonly schedules = toSignal(this.myTimetables.mySchedules$);

  readonly degreeTypeLabel = degreeTypeLabel;
  readonly courseNameFromUrl = courseNameFromUrl;
  readonly downloadFile = downloadScheduleFile;

  readonly lucideDownload = LucideDownload;
  readonly lucideExternalLink = LucideExternalLink;
  readonly lucideSchedule = LucideCalendarClock;
}
