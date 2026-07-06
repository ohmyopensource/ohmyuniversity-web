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

import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideDynamicIcon,
  LucideChevronDown,
  LucideCheck,
  LucideCalendarClock,
  LucideLock,
  LucidePencil,
  LucideExternalLink,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';
import { CustomInputComponent, SelectOption } from '@ui/custom-input/custom-input.component';

import { TEACHING_PERIOD_LABELS, ATTENDANCE_LABELS } from '@constants';
import { Exam, ExamFilter, ExamGroup, FilterOption, TeachingPeriod, AttendanceType } from '@types';
import { GradeSimulatorPopupComponent } from '../grade-simulator-popup/grade-simulator-popup.component';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import { CourseDetailResponse } from 'src/app/core/domain/models/career/course-detail.model';
import { CourseSyllabusResponse } from 'src/app/core/domain/models/career/course-syllabus.model';

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
  readonly iconExternalLink = LucideExternalLink;
  readonly iconLock = LucideLock;
  readonly iconPencil = LucidePencil;

  private readonly careerFacade = inject(CareerFacade);

  readonly mandatoryGroups = input.required<ExamGroup[]>();
  readonly electiveExams = input.required<Exam[]>();
  readonly filterOptions = input.required<FilterOption[]>();
  readonly activeFilter = input.required<ExamFilter>();
  readonly yearFilterOptions = input.required<SelectOption[]>();
  readonly selectedYear = input.required<string>();
  readonly cdsCod = input.required<string>();

  readonly filterChange = output<ExamFilter>();
  readonly yearChange = output<string>();
  readonly simulatedGradeChange = output<{ courseCode: string; grade: number | null }>();

  readonly openExamCodes = new Set<string>();
  readonly courseDetails = signal<Record<string, CourseDetailResponse>>({});
  readonly loadingDetails = signal<Record<string, boolean>>({});
  readonly errorDetails = signal<Record<string, boolean>>({});
  readonly courseSyllabuses = signal<Record<string, CourseSyllabusResponse>>({});
  readonly loadingSyllabuses = signal<Record<string, boolean>>({});
  readonly errorSyllabuses = signal<Record<string, boolean>>({});
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

  toggleExam(exam: Exam): void {
    const courseCode = exam.courseCode;
    if (this.openExamCodes.has(courseCode)) {
      this.openExamCodes.delete(courseCode);
      return;
    }
    this.openExamCodes.add(courseCode);
    this.loadCourseSyllabus(exam);
    if (exam.status !== 'FUTURE') {
      this.loadCourseDetail(exam);
    }
  }

  isOpen(courseCode: string): boolean {
    return this.openExamCodes.has(courseCode);
  }

  courseDetail(courseCode: string): CourseDetailResponse | undefined {
    return this.courseDetails()[courseCode];
  }

  isDetailLoading(courseCode: string): boolean {
    return !!this.loadingDetails()[courseCode];
  }

  isDetailError(courseCode: string): boolean {
    return !!this.errorDetails()[courseCode];
  }

  courseSyllabus(courseCode: string): CourseSyllabusResponse | undefined {
    return this.courseSyllabuses()[courseCode];
  }

  isSyllabusLoading(courseCode: string): boolean {
    return !!this.loadingSyllabuses()[courseCode];
  }

  isSyllabusError(courseCode: string): boolean {
    return !!this.errorSyllabuses()[courseCode];
  }

  private loadCourseSyllabus(exam: Exam): void {
    const courseCode = exam.courseCode;
    if (this.courseSyllabuses()[courseCode] || this.loadingSyllabuses()[courseCode]) {
      return;
    }
    this.loadingSyllabuses.update(m => ({ ...m, [courseCode]: true }));
    this.errorSyllabuses.update(m => {
      const { [courseCode]: _, ...rest } = m;
      return rest;
    });

    this.careerFacade.getCourseSyllabus(courseCode).subscribe({
      next: syllabus => {
        this.loadingSyllabuses.update(m => {
          const { [courseCode]: _, ...rest } = m;
          return rest;
        });
        this.courseSyllabuses.update(m => ({ ...m, [courseCode]: syllabus }));
      },
      error: () => {
        this.loadingSyllabuses.update(m => {
          const { [courseCode]: _, ...rest } = m;
          return rest;
        });
        this.errorSyllabuses.update(m => ({ ...m, [courseCode]: true }));
      },
    });
  }

  private loadCourseDetail(exam: Exam): void {
    const courseCode = exam.courseCode;
    if (this.courseDetails()[courseCode] || this.loadingDetails()[courseCode]) {
      return;
    }
    this.loadingDetails.update(m => ({ ...m, [courseCode]: true }));
    this.errorDetails.update(m => {
      const { [courseCode]: _, ...rest } = m;
      return rest;
    });

    this.careerFacade
      .getCourseDetail(courseCode, this.cdsCod(), exam.aaOffId, exam.cdsId)
      .subscribe({
        next: detail => {
          this.loadingDetails.update(m => {
            const { [courseCode]: _, ...rest } = m;
            return rest;
          });
          this.courseDetails.update(m => ({ ...m, [courseCode]: detail }));
        },
        error: () => {
          this.loadingDetails.update(m => {
            const { [courseCode]: _, ...rest } = m;
            return rest;
          });
          this.errorDetails.update(m => ({ ...m, [courseCode]: true }));
        },
      });
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

  yearGroupVariant(group: ExamGroup): 'success' | 'warning' | 'info' {
    if (group.exams.length === 0) return 'info';
    if (group.passedCount === group.exams.length) return 'success';
    if (group.passedCount > 0) return 'warning';
    return 'info';
  }
}
