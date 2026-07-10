import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideDynamicIcon, LucideX } from '@lucide/angular';
import { PlacedWidget, WidgetDefinition } from '@shared/types';
import { WIDGET_SIZE_CONFIG, AVAILABLE_WIDGETS, GRID_COLS } from '@shared/constants';
import { CareerArithmeticAvgWidgetComponent } from '../../../../widgets/career/career-arithmetic-avg/career-arithmetic-avg.widget';
import { CareerBaseWidgetComponent } from '../../../../widgets/career/career-base/career-base.widget';
import { CareerCfuWidgetComponent } from '../../../../widgets/career/career-cfu/career-cfu.widget';
import { CareerOverviewWidgetComponent } from '../../../../widgets/career/career-overview/career-overview.widget';
import { CareerWeightedAvgWidgetComponent } from '../../../../widgets/career/career-weighted-avg/career-weighted-avg.widget';
import { PortalsEsse3WidgetComponent } from '../../../../widgets/portals/portals-esse3/portals-esse3.widget';
import { PortalsMailWidgetComponent } from '../../../../widgets/portals/portals-mail/portals-mail.widget';
import { PortalsMoodleWidgetComponent } from '../../../../widgets/portals/portals-moodle/portals-moodle.widget';
import { PortalsOverviewWidgetComponent } from '../../../../widgets/portals/portals-overview/portals-overview.widget';
import { PortalsWebsiteWidgetComponent } from '../../../../widgets/portals/portals-website/portals-website.widget';
import { SchedulesOverviewWidgetComponent } from '../../../../widgets/schedules/schedules-overview/schedules-overview.widget';
import { ContactsUsefulWidgetComponent } from '../../../../widgets/contacts/contacts-useful/contacts-useful.widget';
import { ContactsTeachersWidgetComponent } from '../../../../widgets/contacts/contacts-teachers/contacts-teachers.widget';
import { SecretariatFormsWidgetComponent } from '../../../../widgets/secretariat/secretariat-forms/secretariat-forms.widget';
import { SecretariatCallsWidgetComponent } from '../../../../widgets/secretariat/secretariat-calls/secretariat-calls.widget';
import { SecretariatGrantsWidgetComponent } from '../../../../widgets/secretariat/secretariat-grants/secretariat-grants.widget';
import { SecretariatOverviewWidgetComponent } from '../../../../widgets/secretariat/secretariat-overview/secretariat-overview.widget';
import { SecretariatTaxesWidgetComponent } from '../../../../widgets/secretariat/secretariat-taxes/secretariat-taxes.widget';
import { AgendaMonthlyWidgetComponent } from '../../../../widgets/agenda/agenda-monthly/agenda-monthly.widget';
import { AgendaTodayWidgetComponent } from '../../../../widgets/agenda/agenda-today/agenda-today.widget';
import { ExamsUpcomingWidgetComponent } from '../../../../widgets/exams/exams-upcoming/exams-upcoming.widget';
import { ExamsAvailableWidgetComponent } from '../../../../widgets/exams/exams-available/exams-available.widget';

@Component({
  selector: 'app-home-widget-grid',
  standalone: true,
  imports: [
    LucideDynamicIcon,
    CareerArithmeticAvgWidgetComponent,
    CareerBaseWidgetComponent,
    CareerCfuWidgetComponent,
    CareerOverviewWidgetComponent,
    CareerWeightedAvgWidgetComponent,
    PortalsEsse3WidgetComponent,
    PortalsMoodleWidgetComponent,
    PortalsMailWidgetComponent,
    PortalsWebsiteWidgetComponent,
    PortalsOverviewWidgetComponent,
    SchedulesOverviewWidgetComponent,
    ContactsTeachersWidgetComponent,
    ContactsUsefulWidgetComponent,
    SecretariatGrantsWidgetComponent,
    SecretariatFormsWidgetComponent,
    SecretariatCallsWidgetComponent,
    SecretariatTaxesWidgetComponent,
    SecretariatOverviewWidgetComponent,
    AgendaTodayWidgetComponent,
    AgendaMonthlyWidgetComponent,
    ExamsUpcomingWidgetComponent,
    ExamsAvailableWidgetComponent,
  ],
  templateUrl: './home-widget-grid.component.html',
})
export class HomeWidgetGridComponent {
  @Input() placedWidgets: PlacedWidget[] = [];
  @Input() isEditMode: boolean = false;
  @Output() editModeToggled = new EventEmitter<void>();
  @Output() widgetRemoved = new EventEmitter<string>();

  readonly GRID_COLS = GRID_COLS;
  readonly lucideX = LucideX;

  getWidgetDefinition(widgetId: string): WidgetDefinition | undefined {
    return AVAILABLE_WIDGETS.find(w => w.id === widgetId);
  }

  getGridColumn(widget: PlacedWidget): string {
    const config = WIDGET_SIZE_CONFIG[widget.size];
    return `${widget.col + 1} / span ${config.cols}`;
  }

  getGridRow(widget: PlacedWidget): string {
    const config = WIDGET_SIZE_CONFIG[widget.size];
    return `${widget.row + 1} / span ${config.rows}`;
  }
}
