import { Component, input, output, signal, computed } from '@angular/core';
import { LucideDynamicIcon, LucideSearch, LucideCalendarX, LucideInfo } from '@lucide/angular';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { ExamCardComponent } from '../exam-card/exam-card.component';
import { Exam } from '@shared/types/dashboard/dashboard-exams.types';
import { LucideTriangleAlert } from '@lucide/angular';

type ExamFilter = 'open' | 'booked' | 'upcoming' | 'closed';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [
    CustomInputComponent,
    CustomTabsComponent,
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
  readonly cancelClicked = output<Exam>();

  readonly lucideAlertTriangle = LucideTriangleAlert;
  readonly iconSearch = LucideSearch;
  readonly iconCalendarX = LucideCalendarX;
  readonly iconInfo = LucideInfo;

  readonly searchValue = signal('');
  readonly activeFilter = signal<ExamFilter>('open');

  private readonly countOpen = computed(
    () => this.exams().filter(e => e.status === 'open' || e.status === 'closing').length,
  );
  private readonly countBooked = computed(
    () => this.exams().filter(e => e.status === 'booked').length,
  );
  private readonly countUpcoming = computed(
    () => this.exams().filter(e => e.status === 'upcoming').length,
  );
  private readonly countClosed = computed(
    () => this.exams().filter(e => e.status === 'closed').length,
  );

  readonly tabs = computed<TabItem[]>(() => [
    { id: 'open', label: 'Disponibili', badge: this.countOpen() },
    { id: 'booked', label: 'Prenotati', badge: this.countBooked() },
    { id: 'upcoming', label: 'In arrivo', badge: this.countUpcoming() },
    { id: 'closed', label: 'Chiusi', badge: this.countClosed() },
  ]);

  readonly filteredExams = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    let list = this.exams();

    if (this.activeFilter() === 'open') {
      list = list.filter(e => e.status === 'open' || e.status === 'closing');
    } else if (this.activeFilter() === 'booked') {
      list = list.filter(e => e.status === 'booked');
    } else if (this.activeFilter() === 'upcoming') {
      list = list.filter(e => e.status === 'upcoming');
    } else if (this.activeFilter() === 'closed') {
      list = list.filter(e => e.status === 'closed');
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

  onTabChange(id: string): void {
    this.activeFilter.set(id as ExamFilter);
  }
}
