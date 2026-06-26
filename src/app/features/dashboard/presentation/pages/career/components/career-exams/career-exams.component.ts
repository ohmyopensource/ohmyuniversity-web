/**
 * @file career-exams.component.ts
 * @description Replaces the previous "Registro Esami" table with two
 * expandable accordion sections: "Piano di Studi" (mandatory exams, grouped
 * by year) and "Esami a scelta" (elective exams, flat list). Each exam is
 * an expandable card showing its full metadata and CFU-by-CFU breakdown
 * when opened. Mandatory exams not yet passed link to the booking page;
 * elective exams not yet passed show a simple "-" badge instead, since not
 * every elective is meant to be booked.
 */

import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideDynamicIcon,
  LucideChevronDown,
  LucideCheck,
  LucideCalendarClock,
  LucideLock,
  LucidePencil,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';
import { CustomInputComponent, SelectOption } from '@ui/custom-input/custom-input.component';

import { TEACHING_PERIOD_LABELS, ATTENDANCE_LABELS } from '@constants';
import { Exam, ExamFilter, ExamGroup, FilterOption, TeachingPeriod, AttendanceType } from '@types';
import { GradeSimulatorPopupComponent } from '../grade-simulator-popup/grade-simulator-popup.component';

interface PopupState {
  courseCode: string;
  rect: DOMRect;
}

@Component({
  selector: 'app-career-exams',
  standalone: true,
  imports: [
    FormsModule,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTabsComponent,
    CustomInputComponent,
    GradeSimulatorPopupComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './career-exams.component.html',
})
export class CareerExamsComponent {
  readonly iconChevron = LucideChevronDown;
  readonly iconCheck = LucideCheck;
  readonly iconBooking = LucideCalendarClock;
  readonly iconLock = LucideLock;
  readonly iconPencil = LucidePencil;

  readonly mandatoryGroups = input.required<ExamGroup[]>();
  readonly electiveExams = input.required<Exam[]>();
  readonly filterOptions = input.required<FilterOption[]>();
  readonly activeFilter = input.required<ExamFilter>();
  readonly yearFilterOptions = input.required<SelectOption[]>();
  readonly selectedYear = input.required<string>();

  readonly filterChange = output<ExamFilter>();
  readonly yearChange = output<string>();
  readonly simulatedGradeChange = output<{ courseCode: string; grade: number | null }>();

  readonly openExamCodes = new Set<string>();
  activePopup: PopupState | null = null;

  get selectedYearModel(): string {
    return this.selectedYear();
  }

  set selectedYearModel(value: string) {
    this.yearChange.emit(value);
  }

  onFilterChange(id: string): void {
    this.filterChange.emit(id as ExamFilter);
  }

  toggleExam(courseCode: string): void {
    if (this.openExamCodes.has(courseCode)) {
      this.openExamCodes.delete(courseCode);
    } else {
      this.openExamCodes.add(courseCode);
    }
  }

  isOpen(courseCode: string): boolean {
    return this.openExamCodes.has(courseCode);
  }

  openSimulator(event: MouseEvent, courseCode: string): void {
    event.stopPropagation();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.activePopup = { courseCode, rect };
  }

  closeSimulator(): void {
    this.activePopup = null;
  }

  getSimulatedGrade(exam: Exam): number | undefined {
    return exam.simulatedGrade;
  }

  onSimulatedGradeChange(courseCode: string, grade: number | null): void {
    this.simulatedGradeChange.emit({ courseCode, grade });
  }

  periodLabel(period: TeachingPeriod): string {
    return TEACHING_PERIOD_LABELS[period];
  }

  attendanceLabel(attendance: AttendanceType): string {
    return ATTENDANCE_LABELS[attendance];
  }
}
