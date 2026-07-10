import { Component, input } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideDownload,
  LucideExternalLink,
  LucideCalendarDays,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { TimetableResponse } from '../../../../../../../core/domain/models/timetable/timetable.model';
import {
  courseNameFromUrl,
  degreeTypeLabel,
  downloadScheduleFile,
  formatScheduleDate,
} from '@shared/utils/timetable.utils';

@Component({
  selector: 'app-my-schedules',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CustomButtonComponent, LucideDynamicIcon],
  templateUrl: './my-schedules.component.html',
})
export class MySchedulesComponent {
  readonly schedules = input.required<TimetableResponse[]>();

  readonly iconCalendar = LucideCalendarDays;
  readonly iconDownload = LucideDownload;
  readonly iconExternalLink = LucideExternalLink;

  readonly degreeTypeLabel = degreeTypeLabel;
  readonly formatDate = formatScheduleDate;
  readonly courseNameFromUrl = courseNameFromUrl;
  readonly downloadFile = downloadScheduleFile;
}
