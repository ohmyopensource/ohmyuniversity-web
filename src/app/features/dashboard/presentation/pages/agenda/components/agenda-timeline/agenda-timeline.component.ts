import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ElementRef,
  inject,
  afterNextRender,
  viewChild,
  signal,
} from '@angular/core';
import { AgendaEventCardComponent } from '../agenda-event-card/agenda-event-card.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { LucideDynamicIcon, LucideCalendarDays, LucideX } from '@lucide/angular';
import type { AgendaEvent, AgendaEventLayout, PositionedEventLayout } from '@shared/types';
import {
  CALENDAR_TIMELINE,
  calendarEventHeight,
  calendarEventTop,
  calendarHourLabel,
  calendarHourTop,
  calendarTimelineHours,
  calendarTimelineTotalHeight,
  calendarHourTop as hourTopFn,
  calendarEventTimeRange,
  calendarEventTypeVariant,
} from '@shared/utils/calendar.utils';
import { LANE_GAP_PX } from '@shared/constants';

export interface EventGroup {
  top: number;
  height: number;
  events: AgendaEvent[];
  variant: 'error' | 'secondary' | 'warning';
}

@Component({
  selector: 'app-agenda-timeline',
  standalone: true,
  imports: [AgendaEventCardComponent, CustomTextComponent, CustomCardComponent, LucideDynamicIcon],
  templateUrl: './agenda-timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaTimelineComponent {
  private readonly el = inject(ElementRef);

  readonly eventLayouts = input.required<AgendaEventLayout[]>();
  readonly eventSelected = output<AgendaEvent>();

  readonly hours = calendarTimelineHours();
  readonly leftGutter = CALENDAR_TIMELINE.leftGutter;
  readonly totalHeight = calendarTimelineTotalHeight();
  readonly hourTop = calendarHourTop;
  readonly hourLabel = calendarHourLabel;

  readonly scrollContainer = viewChild.required<ElementRef>('scrollContainer');

  readonly activeGroup = signal<EventGroup | null>(null);

  readonly iconCalendar = LucideCalendarDays;
  readonly iconClose = LucideX;

  readonly currentTimePx = computed(() => {
    const now = new Date();
    return hourTopFn(now.getHours()) + (now.getMinutes() / 60) * CALENDAR_TIMELINE.hourHeight;
  });

  constructor() {
    afterNextRender(() => {
      const container = this.scrollContainer().nativeElement;
      const now = new Date();
      const top =
        hourTopFn(now.getHours()) + (now.getMinutes() / 60) * CALENDAR_TIMELINE.hourHeight;
      container.scrollTop = Math.max(0, top - container.clientHeight / 3);
    });
  }

  readonly positionedEvents = computed<PositionedEventLayout[]>(() =>
    this.eventLayouts().map(layout => {
      const top = calendarEventTop(layout.event);
      const height = calendarEventHeight(layout.event);
      const { lane, laneCount } = layout;
      const totalGapPx = LANE_GAP_PX * (laneCount - 1);
      const widthExpr = `calc((100% - ${totalGapPx}px) / ${laneCount})`;
      const laneOffset = `(100% - ${totalGapPx}px) / ${laneCount} + ${LANE_GAP_PX}px`;
      const leftExpr = lane === 0 ? '0px' : `calc(${lane} * (${laneOffset}))`;
      return { layout, top, height, widthExpr, leftExpr, compact: height < 72 };
    }),
  );

  readonly eventGroups = computed<EventGroup[]>(() => {
    const layouts = this.eventLayouts();
    if (layouts.length === 0) return [];

    const groups: EventGroup[] = [];
    const visited = new Set<number>();

    layouts.forEach((layout, i) => {
      if (visited.has(i)) return;

      const groupLayouts = [layout];
      visited.add(i);

      layouts.forEach((other, j) => {
        if (visited.has(j)) return;
        const overlapsAny = groupLayouts.some(existing => {
          const aStart = existing.event.startDate.getTime();
          const aEnd = (existing.event.endDate ?? existing.event.startDate).getTime();
          const bStart = other.event.startDate.getTime();
          const bEnd = (other.event.endDate ?? other.event.startDate).getTime();
          return aStart < bEnd && aEnd > bStart;
        });
        if (overlapsAny) {
          groupLayouts.push(other);
          visited.add(j);
        }
      });

      const groupEvents = groupLayouts.map(l => l.event);
      const minTop = Math.min(...groupEvents.map(e => calendarEventTop(e)));
      const maxBottom = Math.max(
        ...groupEvents.map(e => calendarEventTop(e) + calendarEventHeight(e)),
      );

      groups.push({
        top: minTop,
        height: maxBottom - minTop,
        events: groupEvents,
        variant: calendarEventTypeVariant(groupEvents[0].type),
      });
    });

    return groups;
  });

  onEventClick(event: AgendaEvent): void {
    this.eventSelected.emit(event);
  }

  onGroupClick(group: EventGroup): void {
    if (group.events.length === 1) {
      this.eventSelected.emit(group.events[0]);
    } else {
      this.activeGroup.set(group);
    }
  }

  closeGroup(): void {
    this.activeGroup.set(null);
  }

  onGroupEventClick(event: AgendaEvent): void {
    this.closeGroup();
    this.eventSelected.emit(event);
  }

  eventTimeRange(event: AgendaEvent): string {
    return calendarEventTimeRange(event);
  }

  eventVariant(event: AgendaEvent): string {
    return calendarEventTypeVariant(event.type);
  }
}
