/**
 * @file custom-tab.component.ts
 * @description Reusable tabs component supporting multiple visual styles,
 * color variants, sizes, icons, badges, dark theme support,
 * and controlled tab selection through input/output bindings.
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';

/**
 * Represents a single tab configuration.
 */
export interface TabItem {
  id: string;
  label: string;
  icon?: any;
  badge?: number | string;
  disabled?: boolean;
}

/**
 * Available color variants for active tab states and highlights.
 */
export type TabVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Available tab sizes.
 */
export type TabSize = 'sm' | 'md' | 'lg';

/**
 * Defines the visual presentation style of the tabs component.
 *
 * - line: active indicator displayed as a bottom border
 * - pill: rounded filled active state
 * - card: card-like appearance with borders and background
 * - underline: text-focused style with animated underline
 */
export type TabStyle = 'line' | 'pill' | 'card' | 'underline';

/**
 * Flexible tabs component used for navigation and content switching.
 *
 * Supports:
 * - multiple visual styles
 * - color variants
 * - responsive sizing
 * - optional icons and badges
 * - full-width layouts
 * - dark theme overrides
 *
 * Selection state is controlled externally through the activeTab input,
 * while tab changes are emitted via the tabChange output.
 */
@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './custom-tab.component.html',
  styleUrls: ['./custom-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTabsComponent {
  /**
   * Collection of tabs to render.
   */
  @Input() tabs: TabItem[] = [];

  /**
   * Identifier of the currently active tab.
   * This value is controlled externally by the parent component.
   */
  @Input() activeTab: string = '';

  /**
   * Visual style used to render tabs.
   */
  @Input() tabStyle: TabStyle = 'line';

  /**
   * Color variant applied to active states and highlights.
   */
  @Input() variant: TabVariant = 'primary';

  /**
   * Size applied to tabs, icons, and spacing.
   */
  @Input() size: TabSize = 'md';

  /**
   * Expands tabs to occupy the available width equally.
   */
  @Input() fullWidth: boolean = false;

  /**
   * Applies dark theme styling overrides.
   */
  @Input() darkTheme: boolean = false;

  /** Renders tabs stacked vertically instead of horizontally */
  @Input() vertical: boolean = false;

  /**
   * Emitted when the active tab changes.
   * Contains the identifier of the selected tab.
   */
  @Output() tabChange = new EventEmitter<string>();

  /**
   * Selects a tab and emits its identifier when the tab is enabled
   * and differs from the current active tab.
   *
   * @param tab Tab configuration associated with the clicked item.
   * @returns Void.
   */
  selectTab(tab: TabItem): void {
    if (tab.disabled || tab.id === this.activeTab) return;
    this.tabChange.emit(tab.id);
  }

  /**
   * Checks whether the provided tab matches the currently active tab.
   *
   * @param tab Tab configuration to evaluate.
   * @returns True if the tab is active; otherwise false.
   */
  isActive(tab: TabItem): boolean {
    return tab.id === this.activeTab;
  }

  /**
   * Resolves the icon size associated with the configured tab size.
   *
   * @returns Icon size in pixels.
   */
  get iconSize(): number {
    return { sm: 14, md: 16, lg: 18 }[this.size];
  }

  /**
   * Builds the CSS class list applied to the tabs container.
   *
   * Combines style, variant, size and optional state modifiers
   * into a single class string consumed by the template.
   *
   * @returns Space-separated CSS class string.
   */
  get wrapperClasses(): string {
    return [
      'tabs',
      `tabs--${this.tabStyle}`,
      `tabs--${this.variant}`,
      `tabs--${this.size}`,
      this.fullWidth ? 'tabs--full' : '',
      this.vertical ? 'tabs--vertical' : '',
      this.darkTheme ? 'tabs--dark' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Builds the CSS class list for an individual tab element.
   *
   * Applies active, disabled and layout modifiers based on the
   * current component state and tab configuration.
   *
   * @param tab Tab configuration being rendered.
   * @returns Space-separated CSS class string.
   */
  tabClasses(tab: TabItem): string {
    return [
      'tabs__tab',
      this.isActive(tab) ? 'tabs__tab--active' : '',
      tab.disabled ? 'tabs__tab--disabled' : '',
      this.fullWidth || this.vertical ? 'tabs__tab--full' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Builds the CSS class list for a tab badge.
   *
   * Applies additional styling when the parent tab is active.
   *
   * @param tab Tab configuration associated with the badge.
   * @returns Space-separated CSS class string.
   */
  badgeClasses(tab: TabItem): string {
    return ['tabs__badge', this.isActive(tab) ? 'tabs__badge--active' : '']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * TrackBy function used by Angular to optimize ngFor rendering.
   *
   * Prevents unnecessary DOM recreation when the tab collection
   * changes while preserving item identity through the tab id.
   *
   * @param _ Current item index (unused).
   * @param tab Tab configuration being rendered.
   * @returns Stable unique identifier for the tab.
   */
  trackById(_: number, tab: TabItem): string {
    return tab.id;
  }
}
