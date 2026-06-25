import { Component, ViewChild, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter, Subscription } from 'rxjs';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideDynamicIcon,
  LucideBell,
  LucideHouse,
  LucideChevronRight,
  LucideGraduationCap,
  LucideMessageSquare,
  LucideBriefcase,
  LucideInfo,
  LucideSearch,
  LucideHeart,
  LucideMail,
  LucideBookOpen,
  LucideLibrary,
  LucideExternalLink,
} from '@lucide/angular';
import { API } from 'src/app/core/infrastructure/api/api-endpoints';
import { UniversityConfigResponse } from 'src/app/core/domain/models/career/university-config.model';

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
  hovered?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  hovered?: boolean;
}

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  didattica: 'Didattica',
  'sviluppi-futuri': 'Sviluppi Futuri',
  partner: 'Partner',
  messaggi: 'Messaggi',
  impostazioni: 'Impostazioni',
  profilo: 'Profilo',
};

@Component({
  selector: 'app-dashboard-topbar',
  standalone: true,
  imports: [
    RouterLink,
    LucideDynamicIcon,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomModalComponent,
  ],
  templateUrl: './dashboard-topbar.component.html',
})
export class DashboardTopbarComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly http = inject(HttpClient);
  private sub!: Subscription;

  readonly iconBell = LucideBell;
  readonly iconHome = LucideHouse;
  readonly iconChevron = LucideChevronRight;
  readonly iconSearch = LucideSearch;
  readonly iconHeart = LucideHeart;
  readonly iconMail = LucideMail;
  readonly iconMoodle = LucideBookOpen;
  readonly iconLibrary = LucideLibrary;
  readonly iconEsse3 = LucideExternalLink;

  rootHovered = false;
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  private moodleUrl: string | null = null;
  private libraryUrl: string | null = null;
  private esse3PortalUrl: string | null = null;

  readonly notificationCount = 3;
  readonly notifications: Notification[] = [
    {
      id: '1',
      title: 'Nuovo materiale disponibile',
      body: 'Il prof. Bianchi ha caricato le slide del modulo 4 di Algoritmi.',
      time: '5 minuti fa',
      read: false,
      icon: LucideGraduationCap,
      color: 'var(--color-primary-dark)',
    },
    {
      id: '2',
      title: 'Messaggio ricevuto',
      body: 'Hai un nuovo messaggio da parte del tuo tutor accademico.',
      time: '1 ora fa',
      read: false,
      icon: LucideMessageSquare,
      color: 'var(--color-secondary-dark)',
    },
    {
      id: '3',
      title: 'Opportunità di stage',
      body: 'TechCorp Italia cerca stagisti in area Data Science — scadenza 30 giugno.',
      time: '3 ore fa',
      read: false,
      icon: LucideBriefcase,
      color: 'var(--color-success-dark)',
    },
    {
      id: '4',
      title: 'Aggiornamento piattaforma',
      body: 'OhMyUniversity! è stato aggiornato alla versione 2.1 con nuove funzionalità.',
      time: 'Ieri',
      read: true,
      icon: LucideInfo,
      color: 'var(--color-neutral-400)',
    },
  ];

  @ViewChild('notifModal') notifModal!: CustomModalComponent;

  ngOnInit(): void {
    this.updateBreadcrumbs(this.router.url);
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.updateBreadcrumbs(e.urlAfterRedirects));

    this.http.get<UniversityConfigResponse>(API.university.externalServices).subscribe({
      next: config => {
        this.moodleUrl = config.moodleUrl;
        this.libraryUrl = config.libraryUrl;
        this.esse3PortalUrl = config.esse3PortalUrl;
      },
      error: () => {},
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSearchClick(): void {
    this.toast.info('Funzione non ancora disponibile');
  }

  onMailClick(): void {
    this.http.get(API.email.authUrl, { responseType: 'text' }).subscribe({
      next: url => window.open(url, '_blank'),
      error: () => this.toast.error('Impossibile aprire la mail universitaria.'),
    });
  }

  onMoodleClick(): void {
    if (this.moodleUrl) {
      window.open(this.moodleUrl, '_blank');
    } else {
      this.toast.info('Moodle non disponibile per questa università.');
    }
  }

  onLibraryClick(): void {
    if (this.libraryUrl) {
      window.open(this.libraryUrl, '_blank');
    } else {
      this.toast.info('Biblioteca non disponibile per questa università.');
    }
  }

  onEsse3Click(): void {
    if (this.esse3PortalUrl) {
      window.open(this.esse3PortalUrl, '_blank');
    } else {
      this.toast.info('Portale ESSE3 non disponibile.');
    }
  }

  onFavoritesClick(): void {
    this.toast.info('Funzione non ancora disponibile');
  }

  private updateBreadcrumbs(url: string): void {
    const clean = url.split('?')[0].split('#')[0];
    const segments = clean.split('/').filter(Boolean);
    const rest = segments.slice(1);
    const crumbs: BreadcrumbItem[] = [];
    let accumulated = '/dashboard';
    for (const seg of rest) {
      accumulated += '/' + seg;
      crumbs.push({
        label: SEGMENT_LABELS[seg] ?? this.toTitleCase(seg),
        path: accumulated,
        hovered: false,
      });
    }
    this.breadcrumbs.set(crumbs);
  }

  private toTitleCase(str: string): string {
    return str
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
