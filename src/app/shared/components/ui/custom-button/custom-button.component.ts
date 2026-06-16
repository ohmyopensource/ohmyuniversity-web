/**
 * @file custom-button.component.ts
 * @description
 * Reusable standalone button component for Angular applications.
 *
 * Supports multiple visual variants, sizes, icon rendering, loading states,
 * success states, accessibility features, internal routing, external links,
 * and ripple animations.
 *
 * The component follows a design-system-oriented approach and can be used
 * as a standard button, Angular router link, or external hyperlink while
 * preserving a consistent user experience.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Renderer2,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideDynamicIcon, LucideLoaderCircle, LucideCircleCheck } from '@lucide/angular';

/**
 * Available visual variants for the button component.
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost'
  | 'outline'
  | 'flat';

/**
 * Available button sizes.
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Supported operating modes.
 *
 * - button: standard HTML button
 * - link-internal: Angular Router navigation
 * - link-external: external hyperlink
 */
export type ButtonMode = 'button' | 'link-internal' | 'link-external';

/**
 * Native HTML button types.
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Icon placement relative to the label.
 */
export type IconPosition = 'left' | 'right';

/**
 * Visual style applied when the component enters
 * the succeeded state.
 */
export type SucceededStyle = 'filled' | 'ghost';

/**
 * Design-system button component.
 *
 * Provides a unified API for rendering buttons,
 * internal Angular links and external hyperlinks.
 *
 * Features:
 * - Multiple visual variants
 * - Multiple sizes
 * - Lucide icon support
 * - Loading state
 * - Success state
 * - Accessibility support
 * - Ripple effect animation
 * - Full-width mode
 * - Dark theme support
 *
 * Change detection strategy is set to OnPush
 * for improved rendering performance.
 */
@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon],
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButtonComponent {
  private readonly renderer = inject(Renderer2);

  readonly loaderIcon = LucideLoaderCircle;
  readonly succeededIcon = LucideCircleCheck;

  /**
   * Text displayed inside the button.
   */
  @Input() label: string = '';

  /**
   * Visual variant used to determine the button appearance.
   */
  @Input() variant: ButtonVariant = 'primary';

  /**
   * Size of the button and its internal content.
   */
  @Input() size: ButtonSize = 'md';

  /**
   * Expands the button to occupy the full width
   * of its parent container.
   */
  @Input() fullWidth: boolean = false;

  /**
   * Forces dark-theme styling regardless of the
   * application theme configuration.
   */
  @Input() darkTheme: boolean = false;

  /**
   * Lucide icon component displayed inside the button.
   */
  @Input() icon: any = null;

  /**
   * Position of the icon relative to the label.
   */
  @Input() iconPosition: IconPosition = 'left';

  /**
   * Enables icon-only mode.
   *
   * When enabled, the label is visually hidden and
   * the button is rendered as a square icon button.
   *
   * An ariaLabel value should always be provided.
   */
  @Input() iconOnly: boolean = false;

  /**
   * Disables user interaction with the component.
   */
  @Input() disabled: boolean = false;

  /**
   * Displays a loading indicator and prevents
   * user interaction while active.
   */
  @Input() loading: boolean = false;

  /**
   * Indicates that the associated action completed
   * successfully.
   *
   * When enabled, the component displays a success
   * state and becomes non-interactive.
   */
  @Input() succeeded: boolean = false;

  /**
   * Visual style applied when the component is in
   * the succeeded state.
   */
  @Input() succeededStyle: SucceededStyle = 'filled';

  /**
   * Alternative label displayed while the component
   * is in the succeeded state.
   *
   * If not provided, the default label is used.
   */
  @Input() succeededLabel: string = '';

  /**
   * Operating mode of the component.
   *
   * Determines whether the component behaves as:
   * - a native button
   * - an Angular router link
   * - an external hyperlink
   */
  @Input() mode: ButtonMode = 'button';

  /**
   * Native HTML button type.
   */
  @Input() type: ButtonType = 'button';

  /**
   * Navigation destination.
   *
   * Used as:
   * - routerLink when mode is 'link-internal'
   * - href when mode is 'link-external'
   */
  @Input() href: string = '';

  /**
   * Navigation target used for external links.
   */
  @Input() target: '_self' | '_blank' = '_self';

  /**
   * Accessible label announced by assistive
   * technologies.
   *
   * Required when iconOnly is enabled.
   */
  @Input() ariaLabel: string = '';

  /**
   * Emitted when the button is activated by the user.
   *
   * Emission occurs only when:
   * - mode is set to 'button'
   * - disabled is false
   * - loading is false
   * - succeeded is false
   */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /**
   * Returns the icon size in pixels according
   * to the configured button size.
   *
   * @returns Icon size in pixels.
   */
  get iconSize(): number {
    const map: Record<ButtonSize, number> = { xs: 14, sm: 16, md: 18, lg: 20 };
    return map[this.size];
  }

  /**
   * Determines whether the component should
   * be considered non-interactive.
   *
   * A button becomes inert when:
   * - disabled
   * - loading
   * - succeeded
   *
   * @returns True when user interaction is disabled.
   */
  get isInert(): boolean {
    return this.disabled || this.loading || this.succeeded;
  }

  /**
   * Returns the effective label displayed by
   * the component.
   *
   * When the button is in the succeeded state,
   * the success label takes precedence if provided.
   *
   * @returns Display label text.
   */
  get displayLabel(): string {
    return this.succeeded && this.succeededLabel ? this.succeededLabel : this.label;
  }

  /**
   * Builds the dynamic CSS class map used by
   * the component template.
   *
   * @returns Object containing CSS class flags.
   */
  get btnClasses(): Record<string, boolean> {
    return {
      btn: true,
      [`btn--${this.variant}`]: !this.succeeded,
      'btn--succeeded-filled': this.succeeded && this.succeededStyle === 'filled',
      'btn--succeeded-ghost': this.succeeded && this.succeededStyle === 'ghost',
      [`btn--${this.size}`]: true,
      'btn--full-width': this.fullWidth,
      'btn--dark': this.darkTheme,
      'btn--disabled': this.disabled,
      'btn--loading': this.loading,
      'btn--icon-only': this.iconOnly,
      'btn--icon-right': this.icon !== null && this.iconPosition === 'right' && !this.iconOnly,
    };
  }

  /**
   * Returns the appropriate rel attribute for
   * external links.
   *
   * Prevents reverse tabnabbing when opening
   * links in a new browser tab.
   *
   * @returns HTML rel attribute value.
   */
  get externalRel(): string {
    return this.target === '_blank' ? 'noopener noreferrer' : '';
  }

  /**
   * Handles button click events.
   *
   * Prevents interaction when the component is
   * disabled, loading, or already succeeded.
   *
   * Emits the clicked event when interaction
   * is allowed.
   *
   * @param event Native mouse click event.
   * @returns Void.
   */
  onButtonClick(event: MouseEvent): void {
    if (this.isInert) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }

  /**
   * Creates and manages the ripple animation
   * originating from the user's click position.
   *
   * The ripple element is dynamically created,
   * animated, and removed after completion.
   *
   * No ripple effect is generated when the
   * component is in an inert state.
   *
   * @param event Native mouse click event used
   *     to calculate ripple coordinates.
   * @returns Void.
   */
  onRipple(event: MouseEvent): void {
    if (this.isInert) return;

    const btn = event.currentTarget as HTMLElement;

    btn.querySelectorAll('.btn__ripple').forEach(el => this.renderer.removeChild(btn, el));

    const circle = this.renderer.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();

    this.renderer.setStyle(circle, 'width', `${diameter}px`);
    this.renderer.setStyle(circle, 'height', `${diameter}px`);
    this.renderer.setStyle(circle, 'left', `${event.clientX - rect.left - radius}px`);
    this.renderer.setStyle(circle, 'top', `${event.clientY - rect.top - radius}px`);
    this.renderer.addClass(circle, 'btn__ripple');
    this.renderer.appendChild(btn, circle);

    circle.addEventListener(
      'animationend',
      () => {
        if (btn.contains(circle)) this.renderer.removeChild(btn, circle);
      },
      { once: true },
    );

    setTimeout(() => {
      if (btn.contains(circle)) this.renderer.removeChild(btn, circle);
    }, 600);
  }
}
