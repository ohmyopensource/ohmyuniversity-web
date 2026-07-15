/**
 * @file custom-accordion.component.ts
 * @description
 * Reusable standalone accordion component for Angular applications.
 *
 * Supports multiple color variants, sizes, corner radii, single or
 * multiple open panels, and a fully data-driven API based on an
 * items array (title/content), keeping translation straightforward.
 *
 * The component follows a design-system-oriented approach and can be used
 * for FAQ sections, step-by-step content, or any collapsible list while
 * preserving a consistent user experience.
 */

import { Component, Input, signal, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideChevronDown } from '@lucide/angular';

/** Color variants applied to the open-state border, shadow, header accent, and chevron. */
export type AccordionVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'info'
  | 'neutral';

/** Controls header padding and font size. */
export type AccordionSize = 'sm' | 'md' | 'lg';

/** Corner radius applied to each accordion item. */
export type AccordionRadius = 'sm' | 'md' | 'lg';

/** Represents a single accordion panel, with a header title and its collapsible content. */
export interface AccordionItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-custom-accordion',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAccordionComponent {
  readonly iconChevron = LucideChevronDown;

  /** List of items to render in the accordion. */
  @Input() items: AccordionItem[] = [];

  /** Index of the initially open item. -1 means none open. */
  @Input() defaultOpenIndex: number = -1;

  /** Color variant applied to the open state (border, shadow, header accent, chevron). */
  @Input() variant: AccordionVariant = 'primary';

  /** Controls header padding and font size. */
  @Input() size: AccordionSize = 'md';

  /** Corner radius of each item. */
  @Input() radius: AccordionRadius = 'md';

  /** If true, multiple panels can stay open at once instead of a single one. */
  @Input() multiple: boolean = false;

  /**
   * Optional template used to render each panel's body instead of the plain
   * `item.content` text. When provided, receives the item's index via the
   * `index` context variable — consumers look up their own domain data by
   * index. Existing accordion usages (FAQ, plain text lists) are unaffected
   * since this is opt-in and falls back to the string rendering otherwise.
   */
  @Input() contentTemplate: TemplateRef<{ $implicit: AccordionItem; index: number }> | null = null;

  private readonly openIndexes = signal<Set<number>>(
    this.defaultOpenIndex >= 0 ? new Set([this.defaultOpenIndex]) : new Set(),
  );

  /**
   * Determines whether the panel at the given index is currently expanded.
   *
   * @param index Index of the item to check within the items array.
   * @return {boolean} True if the panel is open, false otherwise.
   */
  isOpen(index: number): boolean {
    return this.openIndexes().has(index);
  }

  /**
   * Generates a dictionary of CSS class flags for the accordion container,
   * based on the configured size and corner radius.
   *
   * @return {Record<string, boolean>} An object where keys are CSS class names and values indicate whether they should be applied.
   */
  get accordionClasses(): Record<string, boolean> {
    return {
      accordion: true,
      [`accordion--${this.size}`]: true,
      [`accordion--radius-${this.radius}`]: true,
    };
  }

  /**
   * Generates a dictionary of CSS class flags for an individual accordion item,
   * based on the configured color variant and its current open state.
   *
   * @param index Index of the item to generate classes for.
   * @return {Record<string, boolean>} An object where keys are CSS class names and values indicate whether they should be applied.
   */
  itemClasses(index: number): Record<string, boolean> {
    return {
      'accordion-item': true,
      [`accordion-item--${this.variant}`]: true,
      'accordion-item--open': this.isOpen(index),
    };
  }

  /**
   * Toggles the open state of the panel at the given index.
   *
   * When `multiple` is true, the panel's state is toggled independently
   * of the others. When false, opening a panel closes any other open
   * panel, enforcing a single-open-at-a-time behavior.
   *
   * @param index Index of the item to toggle.
   * @return {void}
   */
  toggle(index: number): void {
    const current = new Set(this.openIndexes());
    if (this.multiple) {
      if (current.has(index)) {
        current.delete(index);
      } else {
        current.add(index);
      }
    } else {
      const wasOpen = current.has(index);
      current.clear();
      if (!wasOpen) current.add(index);
    }
    this.openIndexes.set(current);
  }
}
