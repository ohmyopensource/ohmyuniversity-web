/**
 * @file custom-avatar.component.ts
 * @description Standalone avatar component supporting image, initials or
 * icon fallback, with optional ring, status dot, and configurable
 * appearance variants.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideUserRound } from '@lucide/angular';

/**
 * Available size scale for the avatar component.
 * Controls dimensions of the avatar container and internal elements.
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Shape variants for the avatar container.
 */
export type AvatarShape = 'circle' | 'rounded' | 'square';

/**
 * Visual variant used for fallback background and optional ring styling.
 * Follows the global design system color palette.
 */
export type AvatarVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

/**
 * Status indicator displayed as an overlay dot on the avatar.
 * Used to represent presence or user state.
 */
export type AvatarDotStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

/**
 * Avatar UI component with multiple fallback strategies and visual states.
 * Supports image source, initials fallback, or default user icon.
 */
@Component({
  selector: 'app-custom-avatar',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './custom-avatar.component.html',
  styleUrls: ['./custom-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAvatarComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  readonly iconUser = LucideUserRound;

  /** Image source for avatar. Falls back to initials or icon if invalid. */
  @Input() src: string = '';

  /** Alternative text for accessibility. Falls back to name or default label. */
  @Input() alt: string = '';

  /** User display name used for initials generation and fallback label. */
  @Input() name: string = '';

  /** Avatar size variant. */
  @Input() size: AvatarSize = 'md';

  /** Avatar shape configuration. */
  @Input() shape: AvatarShape = 'circle';

  /** Color variant used for fallback background and ring styling. */
  @Input() variant: AvatarVariant = 'primary';

  /** Enables dark theme styling. */
  @Input() darkTheme: boolean = false;

  /** Enables outer ring indicator around avatar. */
  @Input() showRing: boolean = false;

  /** Ring thickness level. */
  @Input() ringSize: 'sm' | 'md' | 'lg' = 'md';

  /** Overrides ring color with explicit value. */
  @Input() ringColor: string = '';

  /** Adds spacing between avatar and ring. */
  @Input() ringGap: boolean = true;

  /** Presence/status indicator displayed as overlay dot. */
  @Input() dotStatus: AvatarDotStatus = 'none';

  /** Enables click interaction mode. */
  @Input() clickable: boolean = false;

  /** Accessibility label for avatar element. */
  @Input() ariaLabel: string = '';

  /** Emits click event when avatar is interactive. */
  @Output() avatarClick = new EventEmitter<MouseEvent>();

  /** Tracks image loading failure state. */
  imgError: boolean = false;

  /**
   * Indicates whether the avatar image should be displayed.
   * The image is shown only if a valid source is provided and no load error occurred.
   */
  get showImage(): boolean {
    return !!this.src && !this.imgError;
  }

  /**
   * Indicates whether the initials fallback should be displayed.
   * Used when no valid image is available but a name is provided.
   */
  get showInitials(): boolean {
    return !this.showImage && !!this.name;
  }

  /**
   * Indicates whether the default icon fallback should be displayed.
   * Used when neither image nor name is available.
   */
  get showIcon(): boolean {
    return !this.showImage && !this.name;
  }

  /**
   * Generates initials from the provided full name.
   * Uses the first character of the first and last name parts (max 2 characters).
   *
   * @returns Uppercase initials or empty string if name is not provided.
   */
  get initials(): string {
    if (!this.name) return '';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + (parts.at(-1) ?? '').charAt(0)).toUpperCase();
  }

  /**
   * Returns the pixel size of the internal icon based on avatar size variant.
   *
   * @returns Icon size in pixels.
   */
  get iconSize(): number {
    const map: Record<AvatarSize, number> = {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 26,
      xl: 32,
      '2xl': 40,
    };
    return map[this.size];
  }

  /**
   * Resolves the accessibility label for the avatar.
   * Priority: ariaLabel → name → default fallback.
   *
   * @returns Accessible label string.
   */
  get effectiveAriaLabel(): string {
    return this.ariaLabel || this.name || 'Avatar';
  }

  /**
   * Computes CSS classes for the avatar host element.
   * Reflects size, shape, variant and interaction state.
   *
   * @returns Map of CSS class names.
   */
  get avatarClasses(): Record<string, boolean> {
    return {
      avatar: true,
      [`avatar--${this.size}`]: true,
      [`avatar--${this.shape}`]: true,
      [`avatar--${this.variant}`]: true,
      'avatar--clickable': this.clickable,
      'avatar--dark': this.darkTheme,
      'avatar--ring': this.showRing,
      [`avatar--ring-${this.ringSize}`]: this.showRing,
      'avatar--ring-gap': this.showRing && this.ringGap,
    };
  }

  /**
   * Computes CSS classes for the status indicator dot.
   * Includes status type and size-based styling.
   *
   * @returns Map of CSS class names.
   */
  get dotClasses(): Record<string, boolean> {
    return {
      avatar__dot: true,
      [`avatar__dot--${this.dotStatus}`]: true,
      [`avatar__dot--size-${this.size}`]: true,
    };
  }

  /**
   * Handles image loading failure and switches to fallback rendering.
   * Forces change detection update due to OnPush strategy.
   */
  onImgError(): void {
    this.imgError = true;
    this.cdr.markForCheck();
  }

  /**
   * Handles avatar click interaction when component is clickable.
   * Supports both mouse and keyboard-triggered events.
   *
   * @param event DOM interaction event
   */
  onClick(event: Event): void {
    if (!this.clickable) return;
    if (event instanceof KeyboardEvent) {
      this.avatarClick.emit(new MouseEvent('click'));
    } else {
      this.avatarClick.emit(event as MouseEvent);
    }
  }
}
