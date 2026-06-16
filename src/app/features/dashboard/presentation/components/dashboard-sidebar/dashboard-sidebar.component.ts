import { Component, input, output, ViewChild, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideDynamicIcon,
  LucidePanelLeftClose,
  LucidePanelLeftOpen,
  LucideGraduationCap,
  LucideLogOut,
} from '@lucide/angular';
import { APP_LOGO, APP_NAME, SIDEBAR_ITEMS, SIDEBAR_BOTTOM_ITEMS } from '@constants';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomAvatarComponent, AvatarVariant } from '@ui/custom-avatar/custom-avatar.component';
import {
  AvatarProfilePanelComponent,
  AccountEntry,
  AccountStatus,
  RING_COLORS,
  STATUS_VARIANT,
} from '@ui/avatar-profile-panel/avatar-profile-panel.component';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    NgComponentOutlet,
    RouterLink,
    RouterLinkActive,
    LucideDynamicIcon,
    LucidePanelLeftClose,
    LucidePanelLeftOpen,
    LucideGraduationCap,
    LucideLogOut,
    CustomButtonComponent,
    CustomAvatarComponent,
    AvatarProfilePanelComponent,
  ],
  templateUrl: './dashboard-sidebar.component.html',
  styles: [
    `
      .sidebar-link {
        color: var(--color-neutral-500);
      }
      .sidebar-link svg {
        color: var(--color-neutral-400);
        transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      .sidebar-link:hover {
        background: var(--color-neutral-200);
        color: var(--color-neutral-900);
      }
      .sidebar-link:hover svg {
        color: var(--color-neutral-600);
      }
      .sidebar-link-active {
        background: var(--color-primary-light) !important;
        color: var(--color-primary-text) !important;
      }
      .sidebar-link-active svg {
        color: var(--color-primary-dark) !important;
      }
      .profile-zone:hover {
        background: var(--color-neutral-200);
      }
      .logout-zone {
        color: var(--color-error-dark);
      }
      .logout-zone:hover {
        background: var(--color-error-light);
        color: var(--color-error-text);
      }
    `,
  ],
})
export class DashboardSidebarComponent {
  readonly APP_NAME = APP_NAME;
  readonly APP_LOGO = APP_LOGO;

  private readonly router = inject(Router);

  readonly open = input.required<boolean>();
  readonly toggleSidebar = output<void>();

  readonly iconPanelClose = LucidePanelLeftClose;
  readonly iconPanelOpen = LucidePanelLeftOpen;
  readonly iconLogout = LucideLogOut;

  readonly sidebarItems = SIDEBAR_ITEMS;
  readonly sidebarBottomItems = SIDEBAR_BOTTOM_ITEMS;

  @ViewChild('profilePanelRef') profilePanelRef!: AvatarProfilePanelComponent;

  // @TODO
  readonly accounts: AccountEntry[] = [
    {
      id: 'acc-1',
      name: 'Mario Rossi',
      email: 'mario.rossi@studenti.unibo.it',
      courseLabel: 'Ingegneria Informatica',
      courseAcronym: 'LM',
      universityLabel: 'Università di Bologna',
      status: 'active',
      isCurrent: true,
    },
    {
      id: 'acc-2',
      name: 'Mario Rossi',
      email: 'mario.rossi@studenti.unipi.it',
      courseLabel: 'Fisica Teorica',
      courseAcronym: 'LMcu',
      universityLabel: 'Università di Pisa',
      status: 'warning',
    },
    {
      id: 'acc-3',
      name: 'Mario Rossi',
      email: 'mario.rossi@phd.unito.it',
      courseLabel: 'Dottorato in Matematica',
      courseAcronym: 'DOC',
      universityLabel: 'Università di Torino',
      status: 'graduated',
    },
  ];

  get currentAccount(): AccountEntry {
    return this.accounts.find(a => a.isCurrent) ?? this.accounts[0];
  }

  variantFor(status: AccountStatus): AvatarVariant {
    return STATUS_VARIANT[status];
  }

  ringColorFor(status: AccountStatus): string {
    return RING_COLORS[status];
  }

  onAccountSwitch(account: AccountEntry): void {
    // @TODO
    console.log('Account selezionato:', account.id);
  }

  onLogout(): void {
    // @TODO
    console.log('Logout');
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profilo']);
  }
}
