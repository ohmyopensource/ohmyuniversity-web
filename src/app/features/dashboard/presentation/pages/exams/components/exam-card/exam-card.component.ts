import { Component, input, output } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideCalendarCheck,
  LucideCalendarDays,
  LucideClock,
  LucideUser,
  LucideUsers,
  LucideAward,
  LucideBookOpen,
  LucideBadgeCheck,
  LucideInfo,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { Exam, BookingExamStatus } from '@shared/types/dashboard/dashboard-exams.types';
import { acronymVariant } from '@shared/utils/ui.utils';

@Component({
  selector: 'app-exam-card',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CustomButtonComponent, LucideDynamicIcon],
  templateUrl: './exam-card.component.html',
})
export class ExamCardComponent {
  readonly iconAward = LucideAward;
  readonly iconBookOpen = LucideBookOpen;
  readonly iconBadgeCheck = LucideBadgeCheck;

  readonly exam = input.required<Exam>();
  readonly bookClicked = output<Exam>();
  readonly cancelClicked = output<Exam>();

  readonly iconCalendarCheck = LucideCalendarCheck;
  readonly iconCalendarDays = LucideCalendarDays;
  readonly iconClock = LucideClock;
  readonly iconUser = LucideUser;
  readonly iconUsers = LucideUsers;
  readonly iconInfo = LucideInfo;
  readonly acronymVariant = acronymVariant;

  statusLabel(status: BookingExamStatus): string {
    const map: Record<BookingExamStatus, string> = {
      open: 'Aperto',
      closing: 'In chiusura',
      closed: 'Chiuso',
      booked: 'Prenotato',
      'no-exam': 'Nessun appello',
    };
    return map[status];
  }

  statusVariant(
    status: BookingExamStatus,
  ): 'success' | 'warning' | 'neutral' | 'primary' | 'error' {
    const map: Record<BookingExamStatus, 'success' | 'warning' | 'neutral' | 'primary' | 'error'> =
      {
        open: 'success',
        closing: 'warning',
        closed: 'error',
        booked: 'primary',
        'no-exam': 'neutral',
      };
    return map[status];
  }

  bookLabel(status: BookingExamStatus): string {
    const map: Record<BookingExamStatus, string> = {
      open: 'Prenota',
      closing: 'Prenota',
      closed: 'Chiuso',
      booked: 'Prenotato',
      'no-exam': 'Nessun appello',
    };
    return map[status];
  }

  bookVariant(status: BookingExamStatus): 'primary' | 'success' | 'ghost' {
    const map: Record<BookingExamStatus, 'primary' | 'success' | 'ghost'> = {
      open: 'primary',
      closing: 'primary',
      closed: 'ghost',
      booked: 'success',
      'no-exam': 'ghost',
    };
    return map[status];
  }

  deadlineColor(status: BookingExamStatus): string {
    if (status === 'closed' || status === 'no-exam') return 'var(--color-neutral-400)';
    if (status === 'closing') return 'var(--color-warning-dark)';
    if (status === 'booked') return 'var(--color-info-dark)';
    return 'var(--color-success-dark)';
  }

  deadlineBackground(status: BookingExamStatus): string {
    if (status === 'closed' || status === 'no-exam') return 'var(--color-neutral-100)';
    if (status === 'closing') return 'var(--color-warning-light)';
    if (status === 'booked') return 'var(--color-info-light)';
    return 'var(--color-success-light)';
  }

  countdownDays(): number | null {
    const raw = (this.exam() as any).dataInizioIscr;
    if (!raw || raw === 'N/D') return null;
    const parts = raw.split('/');
    if (parts.length !== 3) return null;
    const data = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);
    const diff = data.getTime() - oggi.getTime();
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : null;
  }

  enrolledLabel(): string {
    const e = this.exam();
    return e.status === 'booked' && e.position != null ? 'Posizione' : 'Iscritti';
  }

  enrolledValue(): string {
    const e = this.exam();
    if (e.status === 'booked' && e.position != null) {
      return e.spotsLeft > 0 ? `${e.position} su ${e.spotsLeft}` : `${e.position}`;
    }
    return String(e.spotsLeft);
  }
}
