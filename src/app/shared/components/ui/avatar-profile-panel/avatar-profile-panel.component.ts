/**
 * @file avatar-profile-panel.component.ts
 * @description Standalone account switcher panel built around avatar-based
 * selection. Provides multi-account management with animated dropdown panel,
 * account switching, and optional actions such as settings, logout, and add
 * account. Supports configurable positioning, animations, and theme modes.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideDynamicIcon, LucideLogOut, LucideSettings, LucidePlus } from '@lucide/angular';
import { AvatarVariant, CustomAvatarComponent } from '../custom-avatar/custom-avatar.component';

/**
 * Account status used to define visual state of avatar and ring.
 */
export type AccountStatus =
  | 'active' // → ring success (verde)
  | 'warning' // → ring warning (giallo)
  | 'suspended' // → ring error   (rosso)
  | 'withdrawn' // → ring neutral (grigio)
  | 'graduated'; // → ring primary (blu)

/**
 * Panel horizontal position relative to trigger.
 */
export type PanelPosition = 'left' | 'right';

/**
 * Animation preset for panel open/close behavior.
 *
 * - ios: scale from center (iOS-style popover)
 * - gmail: vertical slide with fade (Gmail account menu)
 * - fade: opacity-only transition
 * - scale: scale from anchor point (generic dropdown style)
 */
export type PanelAnimation = 'ios' | 'gmail' | 'fade' | 'scale';

/**
 * Account item displayed inside the panel.
 */
export interface AccountEntry {
  id: string;
  name: string;
  courseLabel: string;
  email: string;
  universityLabel: string;
  courseAcronym: string;
  avatarSrc?: string;
  status: AccountStatus;
  isCurrent?: boolean;
}

/**
 * Maps account status to avatar variant.
 */
export const STATUS_VARIANT: Record<AccountStatus, AvatarVariant> = {
  active: 'success',
  warning: 'warning',
  suspended: 'error',
  withdrawn: 'neutral',
  graduated: 'primary',
};

/**
 * Default badge style for course acronym.
 */
export const ACRONYM_COLOR: Record<string, string> = {
  L: 'bg-sky-100 text-sky-800 border border-sky-300',
  LM: 'bg-violet-100 text-violet-800 border border-violet-300',
  LMcu: 'bg-purple-100 text-purple-800 border border-purple-300',
  DOC: 'bg-amber-100 text-amber-800 border border-amber-300',
  DOT: 'bg-orange-100 text-orange-800 border border-orange-300',
  MASTER: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
};
export const ACRONYM_COLOR_DEFAULT = 'bg-gray-100 text-gray-700 border border-gray-300';

/**
 * Maps account status to ring color.
 */
export const RING_COLORS: Record<AccountStatus, string> = {
  active: 'var(--color-success-dark)',
  warning: 'var(--color-warning-dark)',
  suspended: 'var(--color-error-dark)',
  withdrawn: 'var(--color-neutral-400)',
  graduated: 'var(--color-primary-dark)',
};

/**
 * Avatar profile panel component.
 * Provides account switching, profile actions and contextual user menu.
 */
@Component({
  selector: 'app-avatar-profile-panel',
  standalone: true,
  imports: [CommonModule, CustomAvatarComponent, LucideDynamicIcon],
  templateUrl: './avatar-profile-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarProfilePanelComponent {
  private readonly elRef = inject(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly iconLogout = LucideLogOut;
  readonly iconSettings = LucideSettings;
  readonly iconPlus = LucidePlus;

  /** List of accounts displayed in panel. */
  @Input() accounts: AccountEntry[] = [];

  /** Enables dark theme. */
  @Input() darkTheme: boolean = false;

  /** Shows settings action. */
  @Input() showSettings: boolean = true;

  /** Shows logout action. */
  @Input() showLogout: boolean = true;

  /** Shows add account action. */
  @Input() showAddAccount: boolean = false;

  /** Panel width in pixels. */
  @Input() position: PanelPosition = 'right';

  /** Panel open direction. */
  @Input() openDirection: 'down' | 'up' = 'down';

  /** Animation preset. */
  @Input() animation: PanelAnimation = 'ios';

  /** Panel width in pixels. */
  @Input() panelWidth: number = 300;

  /** Emitted when account is switched. */
  @Output() accountSwitch = new EventEmitter<AccountEntry>();

  /** Emitted on settings click. */
  @Output() settingsClick = new EventEmitter<void>();

  /** Emitted on logout click. */
  @Output() logoutClick = new EventEmitter<void>();

  /** Emitted when adding a new account. */
  @Output() addAccount = new EventEmitter<void>();

  /** Emitted when panel is closed. */
  @Output() panelClose = new EventEmitter<void>();

  /** Panel open state. */
  isOpen = false;

  /**
   * Returns the currently active account.
   * Falls back to the first available account if no active one is found.
   *
   * @returns The current account or null if the list is empty.
   */
  get currentAccount(): AccountEntry | null {
    return this.accounts.find(a => a.isCurrent) ?? this.accounts[0] ?? null;
  }

  /**
   * Returns all accounts except the currently active one.
   *
   * @returns Array of secondary accounts.
   */
  get secondaryAccounts(): AccountEntry[] {
    const others = this.accounts.filter(a => !a.isCurrent);
    return this.openDirection === 'up' ? [...others].reverse() : others;
  }

  /**
   * Maps an account status to its corresponding avatar variant.
   *
   * @param status The account status.
   * @returns The corresponding AvatarVariant used for styling.
   */
  variantFor(status: AccountStatus): AvatarVariant {
    return STATUS_VARIANT[status];
  }

  /**
   * Returns the CSS color value used for the avatar ring based on account status.
   *
   * @param status The account status.
   * @returns CSS color string for the ring.
   */
  ringColorFor(status: AccountStatus): string {
    return RING_COLORS[status];
  }

  /**
   * Returns the CSS class used for rendering the acronym badge.
   *
   * @param acronym The course acronym.
   * @returns Tailwind CSS class string for the badge.
   */
  acronymClass(acronym: string): string {
    return ACRONYM_COLOR[acronym] ?? ACRONYM_COLOR_DEFAULT;
  }

  /**
   * Returns the CSS position classes for the panel container
   * based on the configured PanelPosition.
   *
   * @returns Tailwind utility classes for panel positioning.
   */
  get positionClasses(): string {
    const map: Record<PanelPosition, Record<'down' | 'up', string>> = {
      right: { down: 'top-0 left-0', up: 'bottom-0 left-0' },
      left: { down: 'top-0 right-0', up: 'bottom-0 right-0' },
    };
    return map[this.position][this.openDirection];
  }

  /**
   * Returns the base CSS classes used when the panel is in the closed state.
   * These classes define the initial transform and opacity before opening animation.
   *
   * @returns Tailwind utility classes for the closed animation state.
   */
  get animClosedClasses(): string {
    const map: Record<PanelAnimation, string> = {
      ios: 'opacity-0 scale-75',
      gmail: 'opacity-0 -translate-y-3',
      fade: 'opacity-0',
      scale: 'opacity-0 scale-90',
    };
    return map[this.animation];
  }

  /**
   * Returns the transform-origin utility class used to control
   * animation pivot point based on panel position and animation type.
   *
   * @returns Tailwind transform-origin class or empty string.
   */
  get transformOriginClass(): string {
    if (this.animation === 'fade') return '';
    const map: Record<PanelPosition, Record<'down' | 'up', string>> = {
      right: { down: 'origin-top-left', up: 'origin-bottom-left' },
      left: { down: 'origin-top-right', up: 'origin-bottom-right' },
    };
    return map[this.position][this.openDirection];
  }

  /**
   * Returns the full CSS class set for the panel open/close state.
   * Combines animation base state with interaction handling classes.
   *
   * @returns Tailwind utility classes for panel visibility state.
   */
  get panelOpenClasses(): string {
    return this.isOpen
      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
      : `${this.animClosedClasses} pointer-events-none`;
  }

  /**
   * Returns background and border classes depending on theme mode.
   *
   * @returns Tailwind classes for panel background and border.
   */
  get darkBg(): string {
    return this.darkTheme ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
  }

  /**
   * Returns primary text color classes based on theme mode.
   *
   * @returns Tailwind text color classes.
   */
  get darkText(): string {
    return this.darkTheme ? 'text-gray-100' : 'text-gray-800';
  }

  /**
   * Returns secondary/subtitle text color classes based on theme mode.
   *
   * @returns Tailwind text color classes for secondary content.
   */
  get darkSubtext(): string {
    return this.darkTheme ? 'text-gray-400' : 'text-gray-500';
  }

  /**
   * Returns divider/border color classes based on theme mode.
   *
   * @returns Tailwind border color classes.
   */
  get darkDivider(): string {
    return this.darkTheme ? 'border-gray-700' : 'border-gray-100';
  }

  /**
   * Returns hover background classes based on theme mode.
   *
   * @returns Tailwind hover state classes.
   */
  get darkHover(): string {
    return this.darkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  }

  /**
   * Builds the inline CSS style for the avatar ring based on account status.
   *
   * @param status The account status used to determine the ring color.
   * @returns CSS inline style string for outline color.
   */
  ringColorStyle(status: AccountStatus): string {
    const colors: Record<AccountStatus, string> = {
      active: 'var(--color-success-dark)',
      warning: 'var(--color-warning-dark)',
      suspended: 'var(--color-error-dark)',
      withdrawn: 'var(--color-neutral-400)',
      graduated: 'var(--color-primary-dark)',
    };
    return `outline-color: ${colors[status]};`;
  }

  /**
   * Toggles the panel open/close state.
   * Emits close event when transitioning to closed state.
   */
  toggle(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) this.panelClose.emit();
    this.cdr.markForCheck();
  }

  /**
   * Closes the panel and emits a close event.
   */
  close(): void {
    this.isOpen = false;
    this.panelClose.emit();
    this.cdr.markForCheck();
  }

  /**
   * Handles account switching action.
   * Emits selected account and closes the panel.
   *
   * @param account Selected account entry.
   */
  onAccountSwitch(account: AccountEntry): void {
    this.accountSwitch.emit(account);
    this.close();
  }

  /**
   * Handles settings action click.
   * Emits settings event and closes the panel.
   */
  onSettings(): void {
    this.settingsClick.emit();
    this.close();
  }

  /**
   * Handles logout action click.
   * Emits logout event and closes the panel.
   */
  onLogout(): void {
    this.logoutClick.emit();
    this.close();
  }

  /**
   * Handles add account action click.
   * Emits add account event and closes the panel.
   */
  onAdd(): void {
    this.addAccount.emit();
    this.close();
  }

  /**
   * Closes the panel when clicking outside of the component.
   *
   * @param event Mouse click event.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;
    if (!this.elRef.nativeElement.contains(event.target)) this.close();
  }

  /**
   * Closes the panel when pressing the Escape key.
   */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) this.close();
  }
}
