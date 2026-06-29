import { Component, input, output, signal, computed } from '@angular/core';
import { LucideDynamicIcon, LucideSearch, LucideCalendarX, LucideInfo } from '@lucide/angular';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { ExamCardComponent } from '../exam-card/exam-card.component';
import { Exam } from '@shared/types/dashboard/dashboard-exams.types';
import { LucideTriangleAlert } from '@lucide/angular';

type ExamFilter = 'all' | 'open' | 'booked';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [
    CustomInputComponent,
    CustomButtonComponent,
    ExamCardComponent,
    CardStatusComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './exam-list.component.html',
})
export class ExamListComponent {
  readonly exams = input.required<Exam[]>();
  readonly loading = input.required<boolean>();
  readonly error = input.required<boolean>();
  readonly bookClicked = output<Exam>();

  readonly lucideAlertTriangle = LucideTriangleAlert;
  readonly iconSearch = LucideSearch;
  readonly iconCalendarX = LucideCalendarX;
  readonly iconInfo = LucideInfo;

  readonly searchValue = signal('');
  readonly activeFilter = signal<ExamFilter>('all');

  readonly filteredExams = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    let list = this.exams();

    if (this.activeFilter() === 'open') {
      list = list.filter(e => e.status === 'open' || e.status === 'closing');
    } else if (this.activeFilter() === 'booked') {
      list = list.filter(e => e.status === 'booked');
    }

    if (!q) return list;
    return list.filter(
      e => e.courseName.toLowerCase().includes(q) || e.professor.toLowerCase().includes(q),
    );
  });

  readonly examsByYear = computed(() => {
    const groups = new Map<number, Exam[]>();
    for (const exam of this.filteredExams()) {
      const year = exam.year ?? 0;
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year)!.push(exam);
    }
    return Array.from(groups.entries())
      .sort(([a], [b]) => a - b)
      .map(([year, exams]) => ({
        year,
        yearLabel: year > 0 ? `${year}° Anno` : 'Anno non specificato',
        exams,
      }));
  });

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  setFilter(filter: ExamFilter): void {
    this.activeFilter.set(filter);
  }
}
