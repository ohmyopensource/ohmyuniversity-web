import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomModalComponent, type ModalType } from '@ui/custom-modal/custom-modal.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideCheck,
  LucideChevronDown,
  LucideChevronUp,
  LucideDynamicIcon,
} from '@lucide/angular';
import type { AgendaEvent, AgendaFormEventType } from '@shared/types';
import {
  addMinutesToTime,
  autoFormatDateInput,
  autoFormatTimeInput,
  clampTime,
  formatDate,
  formatTime,
  parseDate,
  parseTime,
  stepTime,
  validateDateLive,
  validateTimeLive,
} from '@shared/utils/calendar.utils';
import {
  FORM_TYPE_OPTIONS,
  EVENT_TYPE_TO_FORM_TYPE,
  DEFAULT_DURATION_MINUTES,
  DEFAULT_START_HOUR,
  FORM_TYPE_TO_EVENT_TYPE,
} from '@shared/constants';

@Component({
  selector: 'app-agenda-event-form',
  standalone: true,
  imports: [
    FormsModule,
    CustomModalComponent,
    CustomInputComponent,
    CustomButtonComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './agenda-event-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaEventFormComponent {
  /** Whether the form sheet should be open */
  readonly isOpen = input<boolean>(false);

  /** Event being edited, or null when creating a new one */
  readonly event = input<AgendaEvent | null>(null);

  /** Day to default the start time on, when creating a new event */
  readonly defaultDate = input<Date>(new Date());

  readonly created = output<Omit<AgendaEvent, 'id' | 'createdAt' | 'updatedAt'>>();
  readonly updated = output<{ id: string; partial: Partial<AgendaEvent> }>();
  readonly cancelled = output<void>();

  private readonly modal = viewChild.required(CustomModalComponent);

  readonly modalType: ModalType = 'center';
  readonly typeOptions = FORM_TYPE_OPTIONS;
  readonly iconSave = LucideCheck;
  readonly iconChevronUp = LucideChevronUp;
  readonly iconChevronDown = LucideChevronDown;

  readonly isEditing = computed(() => this.event() !== null);

  readonly durationLabel = computed(() => {
    const start = /^(\d{1,2}):(\d{2})$/.exec(this.startTime().trim());
    const end = /^(\d{1,2}):(\d{2})$/.exec(this.endTime().trim());
    if (!start || !end) return '';

    const startMinutes = Number(start[1]) * 60 + Number(start[2]);
    const endMinutes = Number(end[1]) * 60 + Number(end[2]);
    const diff = endMinutes - startMinutes;
    if (diff <= 0) return '';

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  });

  readonly activeFormType = signal<AgendaFormEventType>('EVENTO');
  readonly title = signal('');
  readonly description = signal('');
  readonly eventDate = signal('');
  readonly startTime = signal('');
  readonly endTime = signal('');
  readonly location = signal('');
  readonly url = signal('');
  readonly errorMessage = signal('');
  readonly dateErrorMessage = signal('');
  readonly timeErrorMessage = signal('');
  readonly endTimeErrorMessage = signal('');

  constructor() {
    effect(() => {
      const current = this.event();
      const defaultDate = this.defaultDate();
      this.errorMessage.set('');
      this.dateErrorMessage.set('');
      this.timeErrorMessage.set('');
      this.endTimeErrorMessage.set('');

      if (current) {
        this.activeFormType.set(EVENT_TYPE_TO_FORM_TYPE[current.type]);
        this.title.set(current.title);
        this.description.set(current.description ?? '');
        this.eventDate.set(formatDate(current.startDate));
        this.startTime.set(formatTime(current.startDate));
        this.endTime.set(
          current.endDate
            ? formatTime(current.endDate)
            : addMinutesToTime(formatTime(current.startDate), DEFAULT_DURATION_MINUTES),
        );
        this.location.set(current.location ?? '');
        return;
      }

      this.activeFormType.set('EVENTO');
      this.title.set('');
      this.description.set('');
      this.eventDate.set(formatDate(defaultDate));
      const defaultStartTime = formatTime(
        new Date(
          defaultDate.getFullYear(),
          defaultDate.getMonth(),
          defaultDate.getDate(),
          DEFAULT_START_HOUR,
          0,
        ),
      );
      this.startTime.set(defaultStartTime);
      this.endTime.set(addMinutesToTime(defaultStartTime, DEFAULT_DURATION_MINUTES));
      this.location.set('');
    });

    effect(() => {
      if (this.isOpen()) {
        this.modal().open();
      } else {
        this.modal().close();
      }
    });
  }

  onDateInput(value: string): void {
    this.dateErrorMessage.set(validateDateLive(value));
    this.eventDate.set(autoFormatDateInput(value));
  }

  onTimeInput(value: string): void {
    this.timeErrorMessage.set(validateTimeLive(value));
    this.startTime.set(autoFormatTimeInput(value));
  }

  onEndTimeInput(value: string): void {
    this.endTimeErrorMessage.set(validateTimeLive(value));
    this.endTime.set(autoFormatTimeInput(value));
  }

  onStartTimeStep(direction: 1 | -1): void {
    this.startTime.set(stepTime(this.startTime(), direction));
    this.timeErrorMessage.set('');
  }

  onEndTimeStep(direction: 1 | -1): void {
    this.endTime.set(stepTime(this.endTime(), direction));
    this.endTimeErrorMessage.set('');
  }

  onTypeChange(formType: string): void {
    this.activeFormType.set(formType as AgendaFormEventType);
  }

  onSave(): void {
    const trimmedTitle = this.title().trim();
    if (!trimmedTitle) {
      this.errorMessage.set('Inserisci un titolo.');
      return;
    }

    const date = parseDate(this.eventDate());
    if (!date.ok) {
      this.dateErrorMessage.set(date.message);
      return;
    }

    const time = parseTime(this.startTime());
    if (!time.ok) {
      this.timeErrorMessage.set(time.message);
      return;
    }

    const endTimeParsed = parseTime(this.endTime());
    if (!endTimeParsed.ok) {
      this.endTimeErrorMessage.set(endTimeParsed.message);
      return;
    }

    this.errorMessage.set('');

    const startDate = new Date(date.year, date.month - 1, date.day, time.hours, time.minutes);
    const endDate = new Date(
      date.year,
      date.month - 1,
      date.day,
      endTimeParsed.hours,
      endTimeParsed.minutes,
    );

    if (endDate.getTime() <= startDate.getTime()) {
      this.endTimeErrorMessage.set("L'ora fine deve essere dopo l'ora inizio.");
      return;
    }

    const type = FORM_TYPE_TO_EVENT_TYPE[this.activeFormType()];
    const trimmedLocation = this.location().trim();
    const trimmedDescription = this.description().trim();
    const trimmedUrl = this.url().trim();
    const normalizedUrl =
      trimmedUrl && !trimmedUrl.startsWith('http') ? `https://${trimmedUrl}` : trimmedUrl || null;

    const existing = this.event();
    if (existing?.id) {
      this.updated.emit({
        id: existing.id,
        partial: {
          title: trimmedTitle,
          description: trimmedDescription || null,
          startDate,
          endDate,
          type,
          location: trimmedLocation || null,
          url: normalizedUrl,
        },
      });
      return;
    }

    this.created.emit({
      title: trimmedTitle,
      description: trimmedDescription || null,
      startDate,
      endDate,
      allDay: false,
      type,
      color: null,
      url: normalizedUrl,
      notes: null,
      location: trimmedLocation || null,
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onStartTimeBlur(): void {
    const val = this.startTime().trim();
    const normalized = autoFormatTimeInput(val);

    let result: string;
    if (/^\d{1,2}$/.test(normalized)) {
      result = normalized.padStart(2, '0') + ':00';
    } else {
      result = normalized;
    }

    result = clampTime(result);
    this.startTime.set(result);
    this.timeErrorMessage.set('');
  }

  onEndTimeBlur(): void {
    const val = this.endTime().trim();
    const normalized = autoFormatTimeInput(val);

    let result: string;
    if (/^\d{1,2}$/.test(normalized)) {
      result = normalized.padStart(2, '0') + ':00';
    } else {
      result = normalized;
    }

    result = clampTime(result);
    this.endTime.set(result);
    this.endTimeErrorMessage.set('');
  }
}
