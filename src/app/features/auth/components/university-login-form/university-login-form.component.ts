import { Component, signal, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideShieldCheck, LucideIdCard } from '@lucide/angular';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { UniversitySearchSelectComponent } from '../university-search-select/university-search-select.component';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { ToastService } from '@ui/custom-toast/toast.service';
import { APP, UNIVERSITIES } from '@constants';
import { University } from '@types';
import { Router } from '@angular/router';

type UniversityTab = 'ateneo' | 'spid' | 'cie';

@Component({
  selector: 'app-university-login-form',
  standalone: true,
  imports: [
    FormsModule,
    CustomTabsComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomLinkComponent,
    CustomModalComponent,
    UniversitySearchSelectComponent,
  ],
  templateUrl: './university-login-form.component.html',
})
export class UniversityLoginFormComponent {
  readonly APP = APP;
  private readonly auth = inject(AuthFacade);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly iconShield = LucideShieldCheck;
  readonly iconCie = LucideIdCard;

  readonly recoveryModal = viewChild<CustomModalComponent>('recoveryModal');

  readonly activeTab = signal<UniversityTab>('ateneo');
  readonly tabs = [
    { id: 'ateneo', label: 'Ateneo' },
    { id: 'spid', label: 'SPID' },
    { id: 'cie', label: 'CIE' },
  ];

  readonly universities = UNIVERSITIES;

  selectedUniversity: University | undefined = undefined;
  email = '';
  password = '';
  isLoading = false;

  readonly cieInfoUrl = 'https://www.cartaidentita.interno.gov.it';
  readonly spidInfoUrl = 'https://www.spid.gov.it';
  readonly spidNoSpidUrl = 'https://www.spid.gov.it/cos-e-spid/come-attivare-spid/';
  readonly spidHelpUrl = 'https://www.spid.gov.it/ottieni-assistenza-dagli-identity-provider/';

  get domainUnavailable(): boolean {
    return !!this.selectedUniversity && this.selectedUniversity.emailDomains.length === 0;
  }

  get emailError(): string {
    const uni = this.selectedUniversity;
    const value = this.email.trim();

    if (!uni || !value) return '';
    if (this.domainUnavailable) return '';

    const domain = value.split('@')[1]?.toLowerCase();
    if (!domain) return 'Inserisci un indirizzo email valido';

    const isValid = uni.emailDomains.some(d => d.toLowerCase() === domain);
    if (!isValid) {
      return `L'email deve appartenere a uno dei domini di ${uni.shortName} (es. nome@${uni.emailDomains[0]})`;
    }
    return '';
  }

  get canSubmit(): boolean {
    return (
      !!this.selectedUniversity &&
      !this.domainUnavailable &&
      !!this.email.trim() &&
      !this.emailError &&
      !!this.password.trim()
    );
  }

  setTab(tab: string): void {
    this.activeTab.set(tab as UniversityTab);
  }

  onUniversitySelected(uni: University): void {
    this.selectedUniversity = uni;
    this.email = '';
  }

  submit(): void {
    if (!this.canSubmit || this.isLoading) return;

    this.auth.clearSession();

    const username = this.email.split('@')[0];
    this.isLoading = true;

    this.auth
      .login({
        universityId: this.selectedUniversity!.id.toUpperCase(),
        username,
        password: this.password,
      })
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          }, 0);
        },
        error: err => {
          setTimeout(() => {
            this.isLoading = false;
            if (err.status === 401) {
              this.toast.show('Credenziali non valide. Controlla email e password.', 'error');
            } else if (err.status === 503) {
              this.toast.show(
                'Il servizio universitario non è raggiungibile. Riprova più tardi.',
                'error',
              );
            } else {
              this.toast.show('Errore durante il login. Riprova più tardi.', 'error');
            }
          }, 0);
        },
      });
  }

  notifyUnavailable(provider: 'SPID' | 'CIE'): void {
    this.toast.show(`L'accesso con ${provider} non è ancora attivo.`, 'warning');
  }

  openRecoveryModal(): void {
    this.recoveryModal()?.open();
  }

  get emailPlaceholder(): string {
    if (!this.selectedUniversity) return 'username@università.it';
    const domains = this.selectedUniversity.emailDomains;
    const studentDomain = domains.find(d => d.startsWith('studenti.'));
    return `username@${studentDomain ?? domains[0]}`;
  }

  get emailHint(): string {
    if (!this.selectedUniversity || this.selectedUniversity.emailDomains.length <= 1) return '';
    const list = this.selectedUniversity.emailDomains.join(', ');
    return `Domini accettati: ${list}`;
  }
}
