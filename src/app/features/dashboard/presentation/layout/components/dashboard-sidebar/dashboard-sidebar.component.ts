import { Component, input, output, inject, OnInit, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucidePanelLeftClose, LucidePanelLeftOpen, LucideLogOut } from '@lucide/angular';
import {
  APP,
  SIDEBAR_ITEMS,
  SIDEBAR_BOTTOM_ITEMS,
  UNIVERSITIES,
  SidebarItem,
} from '@shared/constants';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomAvatarComponent, AvatarVariant } from '@ui/custom-avatar/custom-avatar.component';
import {
  AvatarProfilePanelComponent,
  AccountEntry,
  AccountStatus,
  RING_COLORS,
  STATUS_VARIANT,
} from '@ui/avatar-profile-panel/avatar-profile-panel.component';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { forkJoin, catchError, of } from 'rxjs';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import { ProfiloCarriera } from 'src/app/core/domain/models/auth/auth-tokens.model';
import { UNIVERSITY_ID_KEY } from 'src/app/core/application/usecases/auth/login.usecase';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    NgComponentOutlet,
    RouterLink,
    RouterLinkActive,
    CustomButtonComponent,
    CustomAvatarComponent,
    CustomInputComponent,
    AvatarProfilePanelComponent,
  ],
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent implements OnInit {
  readonly APP = APP;

  private readonly router = inject(Router);
  private readonly auth = inject(AuthFacade);
  private readonly carriera = inject(CareerFacade);

  readonly open = input.required<boolean>();
  readonly toggleSidebar = output<void>();
  readonly linkClicked = output<void>();
  readonly isMobileOpen = input<boolean>(false);

  readonly iconPanelClose = LucidePanelLeftClose;
  readonly iconPanelOpen = LucidePanelLeftOpen;
  readonly iconLogout = LucideLogOut;

  readonly sidebarItems = SIDEBAR_ITEMS;
  readonly sidebarBottomItems = SIDEBAR_BOTTOM_ITEMS;

  readonly currentAccount = signal<AccountEntry>({
    id: 'current',
    name: this.auth.getNomeCompleto(),
    email: '',
    courseLabel: '',
    courseAcronym: '',
    universityLabel: this.universityLabel(this.auth.getUniversityId()),
    status: 'active',
    isCurrent: true,
  });

  readonly accounts = signal<AccountEntry[]>([this.currentAccount()]);
  readonly fotoUrl = signal<string>('');
  readonly hasCarriera = signal(false);

  readonly pendingSwitch = signal<ProfiloCarriera | null>(null);
  readonly showLoginModal = signal(false);

  crossLoginUsername = '';
  crossLoginPassword = '';
  crossLoginLoading = false;
  crossLoginError = '';

  ngOnInit(): void {
    this.hasCarriera.set(this.auth.hasCarriera());
    const profili = this.auth.getProfili();

    console.log('PROFILI RAW:', profili);
    console.log(
      'PROFILI STUID:',
      profili.map(p => p.stuId),
    );

    const profiliUnici = profili.filter(
      (p, i, arr) => arr.findIndex(x => x.stuId === p.stuId) === i,
    );

    console.log('PROFILI UNICI:', profiliUnici);
    console.log('PROFILI UNICI LENGTH:', profiliUnici.length);

    const tuttiAccounts: AccountEntry[] = profiliUnici.map(p => ({
      id: String(p.stuId),
      name: this.auth.getNomeCompleto(),
      email: '',
      courseLabel: p.corsoNome ?? '',
      courseAcronym: this.tipoCorsoAcronym(p.tipoCorsoCod),
      universityLabel: this.universityLabel(p.universityId),
      status: p.attivo ? 'active' : ('withdrawn' as AccountStatus),
      isCurrent: p.universityId.toUpperCase() === (this.auth.getUniversityId() ?? '').toUpperCase(),
      // rimosso il check p.attivo — il profilo corrente può essere cessato
    }));

    const defaultAccount: AccountEntry = {
      id: 'current',
      name: this.auth.getNomeCompleto(),
      email: '',
      courseLabel: '',
      courseAcronym: '',
      universityLabel: this.universityLabel(this.auth.getUniversityId()),
      status: 'active',
      isCurrent: true,
    };

    const finalAccounts = tuttiAccounts.length > 0 ? tuttiAccounts : [defaultAccount];
    this.accounts.set(finalAccounts);
    const attivo = finalAccounts.find(a => a.isCurrent) ?? finalAccounts[0];
    this.currentAccount.set(attivo);

    if (!this.auth.hasCarriera()) return;

    forkJoin({
      badge: this.carriera.getBadge(),
      profilo: this.carriera.getPersona(),
      info: this.carriera.getCareerInfo(),
      foto: this.carriera.getAvatar(),
    }).subscribe({
      next: ({ badge: _badge, profilo, info: _info, foto }) => {
        const fotoUrl = URL.createObjectURL(foto);
        this.fotoUrl.set(fotoUrl);
        const updated = this.accounts().map(a => ({
          ...a,
          avatarSrc: a.isCurrent ? fotoUrl : a.avatarSrc,
          email: a.isCurrent ? (profilo.emailAte ?? '') : '',
        }));
        this.accounts.set(updated);
        const current = updated.find(a => a.isCurrent);
        if (current) this.currentAccount.set(current);
      },
      error: () => {},
    });
  }

  onAccountSwitch(account: AccountEntry): void {
    const profili = this.auth.getProfili();
    const profilo = profili.find(p => String(p.stuId) === account.id);
    if (!profilo) return;

    this.auth
      .switchCarriera(profilo)
      .pipe(
        catchError(err => {
          if (err?.status === 409) {
            this.pendingSwitch.set(profilo);
            this.showLoginModal.set(true);
          }
          return of(null);
        }),
      )
      .subscribe(result => {
        if (!result) return;
        if (
          profilo.universityId.toUpperCase() !== (this.auth.getUniversityId() ?? '').toUpperCase()
        ) {
          localStorage.setItem(UNIVERSITY_ID_KEY, profilo.universityId.toUpperCase());
        }
        const profiliAggiornati = profili.map(p => ({
          ...p,
          attivo: p.stuId === profilo.stuId,
        }));
        localStorage.setItem('omu_profili', JSON.stringify(profiliAggiornati));
        window.location.reload();
      });
  }

  onLoginModalDismiss(): void {
    this.showLoginModal.set(false);
    this.pendingSwitch.set(null);
  }

  onCrossLogin(): void {
    const profilo = this.pendingSwitch();
    if (!profilo || !this.crossLoginUsername || !this.crossLoginPassword) return;

    this.crossLoginLoading = true;
    this.crossLoginError = '';

    this.auth
      .login({
        universityId: profilo.universityId,
        username: this.crossLoginUsername,
        password: this.crossLoginPassword,
      })
      .subscribe({
        next: () => {
          this.crossLoginLoading = false;
          this.showLoginModal.set(false);
          this.pendingSwitch.set(null);
          window.location.reload();
        },
        error: () => {
          this.crossLoginLoading = false;
          this.crossLoginError = 'Credenziali non valide. Riprova.';
        },
      });
  }

  onLogout(): void {
    this.auth.logout().subscribe();
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profilo']);
  }

  private tipoCorsoAcronym(tipoCorsoCod: string | null): string {
    if (!tipoCorsoCod) return 'L';
    if (tipoCorsoCod.startsWith('LM')) return 'LM';
    if (tipoCorsoCod.startsWith('L')) return 'L';
    if (tipoCorsoCod.startsWith('D')) return 'DOC';
    if (tipoCorsoCod.startsWith('M')) return 'MASTER';
    return tipoCorsoCod;
  }

  variantFor(status: AccountStatus): AvatarVariant {
    return STATUS_VARIANT[status];
  }

  ringColorFor(status: AccountStatus): string {
    return RING_COLORS[status];
  }

  iconColorStyle(item: SidebarItem): string {
    return `color: var(--color-${item.color}-dark);`;
  }

  iconActiveStyle(item: SidebarItem): string {
    return `background: var(--color-${item.color}-dark); color: var(--color-${item.color}-text);`;
  }

  linkActiveBgStyle(item: SidebarItem): string {
    return `background: var(--color-${item.color}-light);`;
  }

  private universityLabel(universityId: string | null): string {
    if (!universityId) return 'Università';
    const found = UNIVERSITIES.find(u => u.id === universityId.toLowerCase());
    return found?.shortName ?? universityId;
  }
}
