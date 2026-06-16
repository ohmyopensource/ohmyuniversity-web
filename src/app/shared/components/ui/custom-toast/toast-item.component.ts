/**
 * @file toast-item.component.ts
 * @description
 * Standalone Angular component responsible for rendering and managing
 * an individual toast notification.
 */

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectorRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideDynamicIcon,
  LucideX,
  LucideCircleCheck,
  LucideCircleX,
  LucideTriangleAlert,
  LucideInfo,
  LucideMessageSquare,
} from '@lucide/angular';
import { Toast, ToastService } from './toast.service';

/**
 * Renders and manages an individual toast notification.
 *
 * This component encapsulates all behaviors associated with a single toast,
 * including visual state management, automatic dismissal tracking, action
 * execution, animation handling, and user-driven interactions such as hover
 * and swipe gestures. It is designed to operate as a self-contained UI unit
 * within the application's toast container infrastructure.
 *
 * The component leverages Angular signals and the OnPush change detection
 * strategy to provide efficient UI updates while reducing unnecessary
 * rendering overhead.
 */
@Component({
  selector: 'app-toast-item',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastItemComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly toastService = inject(ToastService);

  readonly iconClose = LucideX;
  readonly iconSuccess = LucideCircleCheck;
  readonly iconError = LucideCircleX;
  readonly iconWarning = LucideTriangleAlert;
  readonly iconInfo = LucideInfo;
  readonly iconNeutral = LucideMessageSquare;

  /**
   * Toast notification data model.
   */
  @Input() toast!: Toast;

  progress = signal(100);
  visible = false;

  private progressInterval: any;
  private startTime = 0;
  private remainingTime = 0;
  private isPaused = false;

  /**
   * Initializes component animations and starts
   * the auto-dismiss progress tracking if enabled.
   *
   * @return {void}
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
      this.cdr.markForCheck();
    }, 10);

    if (this.toast.duration > 0) {
      this.startProgress();
    }
  }

  /**
   * Cleans up active timers when the component
   * is destroyed.
   *
   * @return {void}
   */
  ngOnDestroy(): void {
    this.stopProgress();
  }

  /**
   * Starts tracking the toast lifetime and updates
   * the progress indicator until expiration.
   *
   * @private
   * @return {void}
   */
  private startProgress(): void {
    this.startTime = Date.now();
    this.remainingTime = this.toast.duration;

    this.progressInterval = setInterval(() => {
      if (this.isPaused) return;

      const elapsed = Date.now() - this.startTime;
      const newProgress = 100 - (elapsed / this.toast.duration) * 100;
      this.progress.set(Math.max(0, newProgress));

      if (newProgress <= 0) {
        this.stopProgress();
      }

      this.cdr.markForCheck();
    }, 30);
  }

  /**
   * Stops the progress tracking interval.
   *
   * @private
   * @return {void}
   */
  private stopProgress(): void {
    clearInterval(this.progressInterval);
  }

  /**
   * Pauses the auto-dismiss timer when the user
   * hovers over the toast.
   *
   * @return {void}
   */
  onMouseEnter(): void {
    this.isPaused = true;
    this.toastService.pause(this.toast.id);
  }

  /**
   * Resumes the auto-dismiss timer when the user
   * leaves the toast area.
   *
   * @return {void}
   */
  onMouseLeave(): void {
    this.isPaused = false;
    this.startTime = Date.now() - ((100 - this.progress()) / 100) * this.toast.duration;
    this.toastService.resume(this.toast.id);
  }

  /**
   * Triggers toast dismissal with exit animation.
   *
   * @return {void}
   */
  onDismiss(): void {
    this.animateOut();
  }

  /**
   * Executes the configured toast action and
   * dismisses the notification.
   *
   * @return {void}
   */
  onAction(): void {
    this.toast.action?.onClick();
    this.animateOut();
  }

  /** Initial horizontal position of a drag gesture. */
  dragStartX = 0;

  /** Indicates whether a drag operation is active. */
  isDragging = false;

  /** Current horizontal drag offset in pixels. */
  dragOffset = signal(0);

  /** Dynamic opacity applied during dragging. */
  dragOpacity = signal(1);

  /**
   * Starts a swipe gesture for toast dismissal.
   *
   * @param {MouseEvent | TouchEvent} event
   * Mouse or touch event initiating the drag operation.
   * @return {void}
   */
  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.dragStartX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  /**
   * Updates drag position and opacity while
   * the user is dragging the toast.
   *
   * @param {MouseEvent | TouchEvent} event
   * Current pointer event.
   * @return {void}
   */
  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    const currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const offset = currentX - this.dragStartX;
    this.dragOffset.set(offset);
    this.dragOpacity.set(Math.max(0, 1 - Math.abs(offset) / 150));
    this.cdr.markForCheck();
  }

  /**
   * Completes the drag gesture and determines
   * whether the toast should be dismissed or
   * restored to its original position.
   *
   * @return {void}
   */
  onDragEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (Math.abs(this.dragOffset()) > 80) {
      this.animateOut(this.dragOffset() > 0 ? 'right' : 'left');
    } else {
      // Snap back
      this.dragOffset.set(0);
      this.dragOpacity.set(1);
      this.cdr.markForCheck();
    }
  }

  /**
   * Returns the icon associated with the current
   * toast variant.
   *
   * @return {any} Icon component reference.
   */
  get variantIcon(): any {
    const map: Record<string, any> = {
      success: this.iconSuccess,
      error: this.iconError,
      warning: this.iconWarning,
      info: this.iconInfo,
      neutral: this.iconNeutral,
    };
    return map[this.toast.variant];
  }

  /**
   * Returns the CSS classes applied to the toast.
   *
   * @return {string} Computed CSS class list.
   */
  get toastClasses(): string {
    return [
      'toast-item',
      `toast-item--${this.toast.variant}`,
      this.visible ? 'toast-item--visible' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the inline style used during
   * swipe interactions.
   *
   * @return {string} Inline CSS style string.
   */
  get dragStyle(): string {
    const offset = this.dragOffset();
    const opacity = this.dragOpacity();
    if (offset === 0) return '';
    return `transform: translateX(${offset}px); opacity: ${opacity}; transition: none;`;
  }

  /**
   * Plays the exit animation and removes
   * the toast after the animation completes.
   *
   * @private
   * @param {'right' | 'left' | 'default'} [direction='default']
   * Exit direction used for swipe dismiss animations.
   * @return {void}
   */
  private animateOut(direction: 'right' | 'left' | 'default' = 'default'): void {
    this.visible = false;
    this.stopProgress();

    if (direction !== 'default') {
      const offset = direction === 'right' ? 300 : -300;
      this.dragOffset.set(offset);
      this.dragOpacity.set(0);
    }

    this.cdr.markForCheck();

    setTimeout(() => {
      this.toastService.dismiss(this.toast.id);
    }, 300);
  }
}
