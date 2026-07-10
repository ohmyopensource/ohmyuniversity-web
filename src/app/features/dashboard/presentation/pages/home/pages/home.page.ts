import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardLayoutService } from 'src/app/features/dashboard/services/dashboard-layout.service';
import {
  AVAILABLE_WIDGETS,
  MOTIVATIONAL_QUOTES,
  WIDGET_SIZE_CONFIG,
  GRID_COLS,
} from '@shared/constants';
import { PlacedWidget, WidgetDefinition, WidgetSize } from '@shared/types';
import { LucidePlus, LucideX, LucidePencil, LucideTriangleAlert } from '@lucide/angular';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { HomeGreetingComponent } from '../components/home-greeting/home-greeting.component';
import { HomeWidgetPanelComponent } from '../components/home-widget-panel/home-widget-panel.component';
import { HomePlacingGridComponent } from '../components/home-placing-grid/home-placing-grid.component';
import { HomeWidgetGridComponent } from '../components/home-widget-grid/home-widget-grid.component';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { cryptoRandInt } from '@shared/utils/crypto-rand';

export type DashboardStep = 'idle' | 'selecting-size' | 'placing';

@Component({
  selector: 'app-dashboard-home-page',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    CustomButtonComponent,
    HomeGreetingComponent,
    HomeWidgetPanelComponent,
    HomePlacingGridComponent,
    HomeWidgetGridComponent,
  ],
  templateUrl: './home.page.html',
})
export class DashboardHomePage {
  readonly lucideAlertTriangle = LucideTriangleAlert;

  readonly layoutService = inject(DashboardLayoutService);
  readonly placedWidgets = computed(() => this.layoutService.layout().widgets);
  readonly widgetPanel = viewChild<HomeWidgetPanelComponent>('widgetPanel');
  private readonly auth = inject(AuthFacade);

  readonly userName = this.auth.getNome();

  readonly lucidePlus = LucidePlus;
  readonly lucideX = LucideX;
  readonly lucidePencil = LucidePencil;

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Buongiorno';
    if (hour >= 12 && hour < 18) return 'Buon pomeriggio';
    return 'Buonasera';
  });

  readonly quote = MOTIVATIONAL_QUOTES[cryptoRandInt(MOTIVATIONAL_QUOTES.length)];
  readonly availableWidgets = AVAILABLE_WIDGETS;

  readonly step = signal<DashboardStep>('idle');
  readonly pendingWidget = signal<WidgetDefinition | null>(null);
  readonly pendingSize = signal<WidgetSize>('small');
  readonly isEditMode = signal(false);

  get isPlacingMode(): boolean {
    return this.step() !== 'idle';
  }

  openWidgetPanel(): void {
    this.widgetPanel()?.open();
  }

  onWidgetSelected(event: { widget: WidgetDefinition; size: WidgetSize; replace: boolean }): void {
    if (event.replace) {
      const existing = this.placedWidgets().find(w => w.widgetId === event.widget.id);
      if (existing) this.layoutService.removeWidget(existing.instanceId);
    }
    this.pendingWidget.set(event.widget);
    this.pendingSize.set(event.size);
    this.step.set('placing');
  }

  onSizeConfirmed(size: WidgetSize): void {
    this.pendingSize.set(size);
    this.step.set('placing');
  }

  onPlaced(event: { row: number; col: number }): void {
    const widget = this.pendingWidget();
    const size = this.pendingSize();
    if (!widget) return;
    const config = WIDGET_SIZE_CONFIG[size];
    if (event.col + config.cols > GRID_COLS) return;
    const placed: PlacedWidget = {
      instanceId: crypto.randomUUID(),
      widgetId: widget.id,
      size,
      row: event.row,
      col: event.col,
    };
    this.layoutService.addWidget(placed);
    this.cancelFlow();
  }

  cancelFlow(): void {
    this.step.set('idle');
    this.pendingWidget.set(null);
  }

  toggleEditMode(): void {
    if (this.isPlacingMode) return;
    this.isEditMode.set(!this.isEditMode());
  }

  removeWidget(instanceId: string): void {
    this.layoutService.removeWidget(instanceId);
    if (this.placedWidgets().length === 0) this.isEditMode.set(false);
  }
}
