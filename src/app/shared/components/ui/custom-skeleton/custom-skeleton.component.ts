/**
 * @file custom-skeleton.component.ts
 * @description
 * Reusable placeholder component used to represent loading UI states
 * (text lines, avatars, images, buttons, badges) without relying on
 * literal "loading..." copy. Supports multiple shapes, animation styles,
 * repeated items, and a dedicated spinner mode for punctual loading
 * indicators (e.g. inline in a button or a small widget).
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Shape rendered by the skeleton element. */
export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'button' | 'badge';

/** Animation style applied to the skeleton surface. */
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'wave' | 'spinner' | 'none';

/** Preset sizing scale, used when width/height are not explicitly provided. */
export type SkeletonSize = 'sm' | 'md' | 'lg' | 'full';

/** Border radius applied to the skeleton shape. */
export type SkeletonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * Displays one or more animated placeholder shapes used to represent
 * content that is still loading. Designed to replace textual loading
 * messages with a purely visual, accessible loading affordance.
 */
@Component({
  selector: 'app-custom-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-skeleton.component.html',
  styleUrls: ['./custom-skeleton.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSkeletonComponent {
  /** Shape of the skeleton placeholder. */
  @Input() variant: SkeletonVariant = 'text';

  /** Animation style applied to the placeholder surface. */
  @Input() animation: SkeletonAnimation = 'shimmer';

  /** Preset sizing scale used when width/height are not set. */
  @Input() size: SkeletonSize = 'md';

  /** Explicit width (number = px, or any valid CSS length/percentage). */
  @Input() width: string | number = '';

  /** Explicit height (number = px, or any valid CSS length/percentage). */
  @Input() height: string | number = '';

  /** Border radius applied to the shape. Ignored for variant='circle'. */
  @Input() rounded: SkeletonRounded = 'md';

  /** Number of repeated skeleton items rendered (e.g. a list of text lines). */
  @Input() count: number = 1;

  /** Gap between repeated items. */
  @Input() gap: string = '0.6rem';

  /**
   * Width of the last line when variant='text' and count > 1,
   * for a realistic paragraph effect.
   */
  @Input() lastLineWidth: string = '70%';

  /** Lays repeated items out horizontally instead of vertically. */
  @Input() inline: boolean = false;

  /** Applies dark theme styling. */
  @Input() darkTheme: boolean = false;

  /**
   * Accessible label announced by screen readers while content is loading.
   * No visible text is ever rendered by this component.
   */
  @Input() ariaLabel: string = 'Caricamento contenuto in corso';

  /**
   * Returns an array used to repeat the skeleton item `count` times.
   *
   * @returns Array of indices, one per skeleton item to render.
   */
  get items(): number[] {
    return Array.from({ length: Math.max(1, this.count) }, (_, i) => i);
  }

  /**
   * Indicates whether the spinner animation should be rendered instead
   * of a static shaped placeholder.
   *
   * @returns True when animation is set to 'spinner'.
   */
  get isSpinner(): boolean {
    return this.animation === 'spinner';
  }

  /**
   * Resolves a numeric or string width/height input into a valid CSS length.
   *
   * @param value Raw width or height input.
   * @returns CSS length string, or empty string when not provided.
   */
  private toCssLength(value: string | number): string {
    if (value === '' || value === null || value === undefined) return '';
    return typeof value === 'number' ? `${value}px` : value;
  }

  /**
   * Returns the inline style object applied to a given skeleton item,
   * accounting for the shortened last line on multi-line text skeletons.
   *
   * @param index Index of the item within the repeated set.
   * @returns Style object with resolved width/height.
   */
  itemStyle(index: number): Record<string, string> {
    const isLastTextLine = this.variant === 'text' && this.count > 1 && index === this.count - 1;

    const width = this.toCssLength(this.width) || (isLastTextLine ? this.lastLineWidth : '');
    const height = this.toCssLength(this.height);

    const style: Record<string, string> = {};
    if (width) style['width'] = width;
    if (height) style['height'] = height;
    return style;
  }

  /**
   * Builds the CSS class map applied to the wrapper element.
   *
   * @returns Object of CSS class flags for the skeleton group container.
   */
  get groupClasses(): Record<string, boolean> {
    return {
      'skeleton-group': true,
      'skeleton-group--inline': this.inline,
      'skeleton-group--dark': this.darkTheme,
    };
  }

  /**
   * Builds the CSS class map applied to each skeleton item.
   *
   * @returns Object of CSS class flags for a single skeleton shape.
   */
  get itemClasses(): Record<string, boolean> {
    return {
      skeleton: true,
      [`skeleton--${this.variant}`]: !this.isSpinner,
      [`skeleton--size-${this.size}`]: !this.isSpinner,
      [`skeleton--rounded-${this.rounded}`]: this.variant !== 'circle' && !this.isSpinner,
      [`skeleton--anim-${this.animation}`]: !this.isSpinner,
      'skeleton--dark': this.darkTheme,
    };
  }
}
