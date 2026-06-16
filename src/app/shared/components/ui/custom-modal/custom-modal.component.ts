/**
 * @file custom-modal.component.ts
 * @description Flexible modal component supporting multiple layouts (center, drawers, fullscreen),
 * configurable behavior, animations, and programmatic control via public API.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideX } from '@lucide/angular';

/**
 * Defines modal layout strategy.
 */
export type ModalType =
  | 'center'
  | 'drawer-right'
  | 'drawer-left'
  | 'drawer-bottom'
  | 'drawer-top'
  | 'fullscreen';

/**
 * Size preset for centered modal layout.
 */
export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

/**
 * Reason emitted when modal is closed.
 */
export type CloseReason = 'backdrop' | 'esc' | 'button' | 'programmatic';

/**
 * Base modal component supporting multiple presentation modes
 * (center, drawer, fullscreen), configurable behavior, and
 * programmatic control via public API.
 */
@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomModalComponent implements OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  readonly iconClose = LucideX;

  /** Modal layout type. Default: 'center'. */
  @Input() type: ModalType = 'center';

  /** Size preset for center layout. Default: 'md'. */
  @Input() size: ModalSize = 'md';

  /**
   * Width of drawer layouts (px or CSS value).
   * Example: 400, '40vw'. Default: 480px.
   */
  @Input() drawerSize: number | string = 480;

  /**
   * Height of sheet layouts (px or CSS value).
   * Default: 'auto' (content-based, max 90vh).
   */
  @Input() sheetSize: number | string = 'auto';

  /** Modal title. If empty, header is not rendered. */
  @Input() title: string = '';

  /** Optional subtitle displayed under title. */
  @Input() subtitle: string = '';

  /** Shows close button in header. Default: true. */
  @Input() showCloseButton: boolean = true;

  /** Enables backdrop click to close modal. Default: true. */
  @Input() closeOnBackdrop: boolean = true;

  /** Enables ESC key to close modal. Default: true. */
  @Input() closeOnEsc: boolean = true;

  /**
   * Prevents modal from closing via backdrop or ESC.
   * Overrides closeOnBackdrop and closeOnEsc.
   */
  @Input() persistent: boolean = false;

  /** Enables shake animation when interaction is blocked. Default: true. */
  @Input() shakeOnPersist: boolean = true;

  /** Enables dark theme styling. */
  @Input() darkTheme: boolean = false;

  /** Locks document scroll while modal is open. Default: true. */
  @Input() lockScroll: boolean = true;

  /** Emitted when modal is closed. */
  @Output() closed = new EventEmitter<CloseReason>();

  /** Emitted when modal is opened. */
  @Output() opened = new EventEmitter<void>();

  isOpen = false;
  isVisible = false;
  isShaking = false;

  private openTimer: any;
  private closeTimer: any;

  /** Opens the modal. */
  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    if (this.lockScroll) document.body.style.overflow = 'hidden';
    this.cdr.markForCheck();

    this.openTimer = setTimeout(() => {
      this.isVisible = true;
      this.cdr.markForCheck();
      this.opened.emit();
    }, 10);
  }

  /**
   * Closes the modal with a given reason.
   *
   * @param reason Reason why the modal is being closed.
   */
  close(reason: CloseReason = 'programmatic'): void {
    if (!this.isOpen) return;

    // Controlla persistenza
    if (this.persistent && (reason === 'backdrop' || reason === 'esc')) {
      this.shake();
      return;
    }

    this.isVisible = false;
    this.cdr.markForCheck();

    this.closeTimer = setTimeout(() => {
      this.isOpen = false;
      if (this.lockScroll) document.body.style.overflow = '';
      this.cdr.markForCheck();
      this.closed.emit(reason);
    }, 300);
  }

  /**
   * Toggles modal open/close state.
   */
  toggle(): void {
    if (this.isOpen) {
      this.close('button');
    } else {
      this.open();
    }
  }

  /**
   * Handles backdrop click interaction.
   */
  onBackdropClick(): void {
    if (this.closeOnBackdrop) this.close('backdrop');
    else this.shake();
  }

  /**
   * Handles close button click.
   */
  onCloseButton(): void {
    this.close('button');
  }

  /**
   * Handles ESC key press at document level.
   */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.isOpen) return;
    if (this.closeOnEsc) this.close('esc');
    else this.shake();
  }

  /**
   * Returns whether the modal has a visible header.
   *
   * @returns True if title or close button is present.
   */
  get hasHeader(): boolean {
    return !!(this.title || this.showCloseButton);
  }

  /**
   * Returns computed drawer width CSS value.
   *
   * @returns CSS size string.
   */
  get drawerSizeStyle(): string {
    if (typeof this.drawerSize === 'number') return `${this.drawerSize}px`;
    return this.drawerSize;
  }

  /**
   * Returns computed sheet height CSS value.
   *
   * @returns CSS size string.
   */
  get sheetSizeStyle(): string {
    if (this.sheetSize === 'auto') return 'auto';
    if (typeof this.sheetSize === 'number') return `${this.sheetSize}px`;
    return this.sheetSize;
  }

  /**
   * Returns CSS classes for backdrop element.
   *
   * @returns Space-separated class string.
   */
  get backdropClasses(): string {
    return [
      'modal-backdrop',
      this.isVisible ? 'modal-backdrop--visible' : '',
      this.darkTheme ? 'modal-backdrop--dark' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns CSS classes for modal container.
   *
   * @returns Space-separated class string.
   */
  get containerClasses(): string {
    return [
      'modal-container',
      `modal-container--${this.type}`,
      this.type === 'center' ? `modal-container--${this.size}` : '',
      this.isVisible ? 'modal-container--visible' : '',
      this.isShaking ? 'modal-container--shake' : '',
      this.darkTheme ? 'modal-container--dark' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Triggers shake animation when interaction is blocked.
   */
  private shake(): void {
    if (!this.shakeOnPersist || this.isShaking) return;
    this.isShaking = true;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.isShaking = false;
      this.cdr.markForCheck();
    }, 400);
  }

  /**
   * Cleanup lifecycle hook.
   */
  ngOnDestroy(): void {
    clearTimeout(this.openTimer);
    clearTimeout(this.closeTimer);
    if (this.lockScroll) document.body.style.overflow = '';
  }
}
