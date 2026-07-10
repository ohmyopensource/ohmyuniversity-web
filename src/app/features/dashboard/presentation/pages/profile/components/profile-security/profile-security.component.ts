import { Component, OnInit, inject, signal } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideShield,
  LucideLogOut,
  LucideTriangleAlert,
} from '@lucide/angular';
import { DatePipe } from '@angular/common';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { AuthSession } from 'src/app/core/domain/models/auth/auth-session.model';
import { ToastService } from '@ui/custom-toast/toast.service';
import { sessionDeviceLabel } from '@shared/utils/user-agent.utils';

@Component({
  selector: 'app-profile-security',
  standalone: true,
  imports: [
    DatePipe,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    CardStatusComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './profile-security.component.html',
})
export class ProfileSecurityComponent implements OnInit {
  private readonly auth = inject(AuthFacade);
  private readonly toast = inject(ToastService);

  readonly iconShield = LucideShield;
  readonly iconLogOut = LucideLogOut;
  readonly iconAlertTriangle = LucideTriangleAlert;

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly sessions = signal<AuthSession[]>([]);
  readonly revokingId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadSessions();
  }

  private loadSessions(): void {
    this.loading.set(true);
    this.error.set(false);
    this.auth.getSessions().subscribe({
      next: sessions => {
        this.sessions.set(sessions);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  deviceLabel(session: AuthSession): string {
    return sessionDeviceLabel(session.userAgent);
  }

  revoke(session: AuthSession): void {
    this.revokingId.set(session.sessionId);
    this.auth.revokeSession(session.sessionId).subscribe({
      next: () => {
        this.sessions.update(list => list.filter(s => s.sessionId !== session.sessionId));
        this.revokingId.set(null);
        this.toast.success('Sessione disconnessa.', { duration: 4000 });
      },
      error: () => {
        this.revokingId.set(null);
        this.toast.error('Impossibile disconnettere la sessione. Riprova.', { duration: 5000 });
      },
    });
  }
}
