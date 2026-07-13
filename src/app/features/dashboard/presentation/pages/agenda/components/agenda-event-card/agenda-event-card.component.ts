import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { LucideDynamicIcon, LucideLink, LucideMapPin } from '@lucide/angular';
import type { AgendaEvent } from '@shared/types/dashboard/dashboard-agenda.types';
import {
  calendarEventDurationLabel,
  calendarEventTimeRange,
  calendarEventTypeIcon,
  calendarEventTypeVariant,
} from '@shared/utils/calendar.utils';
import { getLabelColorClass } from '@shared/utils/orientation.utils';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';

@Component({
  selector: 'app-agenda-event-card',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomBadgeComponent,
    CustomTextComponent,
    CustomLinkComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './agenda-event-card.component.html',
  styleUrls: ['./agenda-event-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaEventCardComponent {
  readonly iconMapPin = LucideMapPin;
  readonly iconLink = LucideLink;

  readonly event = input.required<AgendaEvent>();
  readonly compact = input<boolean>(false);

  readonly cardClick = output<void>();

  readonly variant = computed(() => calendarEventTypeVariant(this.event().type));
  readonly icon = computed(() => calendarEventTypeIcon(this.event().type));
  readonly timeRange = computed(() => calendarEventTimeRange(this.event()));
  readonly durationLabel = computed(() => calendarEventDurationLabel(this.event()));

  readonly titleColorClass = computed(() => getLabelColorClass(this.variant()));

  onCardClick(): void {
    this.cardClick.emit();
  }
}
