import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

// Public
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { HomePage } from './features/home/pages/home.page';
import { OrientationPage } from './features/orientation/pages/orientation.page';
import { AboutPage } from './features/about/pages/about.page';
import { PartnerPage } from './features/partner/pages/partner.page';
import { ContattiPage } from './features/contatti/pages/contatti.page';

// Auth
import { LoginPage } from './features/auth/pages/login.page';

// FAQ
import { FaqBusinessPage } from './features/faq/pages/faq-business/faq-business.page';
import { FaqPage } from './features/faq/pages/faq/faq.page';

// Business
import { BusinessCollettiviPage } from './features/business/pages/business-collettivi/business-collettivi.page';
import { BusinessContattiPage } from './features/business/pages/business-contatti/business-contatti.page';
import { BusinessOffertaPage } from './features/business/pages/business-offerta/business-offerta.page';
import { BusinessRegistrazionePage } from './features/business/pages/business-registrazione/business-registrazione.page';
import { BusinessVisibilitaPage } from './features/business/pages/business-visibilita/business-visibilita.page';
import { PricingPage } from './features/pricing/pages/pricing.page';

// Legal
import { PrivacyPolicyPage } from './features/legal/pages/privacy-policy/privacy-policy.page';
import { CookiePolicyPage } from './features/legal/pages/cookie-policy/cookie-policy.page';
import { TermsPage } from './features/legal/pages/terms-conditions/terms-conditions.page';

// Dashboard Layout
import { DashboardLayoutComponent } from './features/dashboard/presentation/layout/dashboard-layout.component';

// Dashboard Pages
import { DashboardHomePage } from './features/dashboard/presentation/pages/home/pages/home.page';
import { CareerPage } from './features/dashboard/presentation/pages/career/pages/career.page';
import { ExamsPage } from './features/dashboard/presentation/pages/exams/pages/exams.page';
import { SurveyUnitsPage } from './features/dashboard/presentation/pages/exams/components/survey-units/survey-units.component';
import { SurveyCompilationPage } from './features/dashboard/presentation/pages/exams/components/survey-compilation/survey-compilation.page';
import { AgendaPage } from './features/dashboard/presentation/pages/agenda/pages/agenda.page';
import { SchedulePage } from './features/dashboard/presentation/pages/schedule/pages/schedule.page';

// =============================================
import { RoadmapPage } from './features/dashboard/presentation/pages/roadmap/roadmap.page';

// =============================================
import { ChatPage } from './features/dashboard/presentation/pages/chat/chat.page';

// =============================================
import { TransportPage } from './features/dashboard/presentation/pages/transport/pages/transport.page';
import { ClassroomsPage } from './features/dashboard/presentation/pages/classrooms/pages/classrooms.page';

// =============================================
import { PortalsPage } from './features/dashboard/presentation/pages/portals/pages/portals.page';

// =============================================
import { UniversityPartnerPage } from './features/dashboard/presentation/pages/university-partner/university-partner.page';
import { UniversityContactsPage } from './features/dashboard/presentation/pages/university-contacts/university-contacts.page';
import { SecretariatPage } from './features/dashboard/presentation/pages/secretariat/pages/secretariat.page';
import { SettingsPage } from './features/dashboard/presentation/pages/settings/settings.page';
import { ProfilePage } from './features/dashboard/presentation/pages/profile/pages/profile.page';

// Shared
import { NotFoundPage } from './shared/components/pages/not-found/not-found.page';
import { carrieraGuard } from './core/guards/carriera.guard';

export const routes: Routes = [
  // =============================================
  // Public Layout
  // =============================================
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      // Marketing / Landing
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'chi-siamo',
        component: AboutPage,
      },
      {
        path: 'contatti',
        component: ContattiPage,
      },
      {
        path: 'partner',
        component: PartnerPage,
      },

      // Auth
      {
        path: 'login',
        component: LoginPage,
      },

      // Orientamento (guest)
      {
        path: 'orientamento',
        component: OrientationPage,
      },

      // FAQ
      {
        path: 'faq',
        component: FaqPage,
      },
      {
        path: 'business/faq',
        component: FaqBusinessPage,
      },

      // Business (B2B)
      {
        path: 'business/prezzi',
        component: PricingPage,
      },
      {
        path: 'business/offerta',
        component: BusinessOffertaPage,
      },
      {
        path: 'business/collettivi',
        component: BusinessCollettiviPage,
      },
      {
        path: 'business/visibilita',
        component: BusinessVisibilitaPage,
      },
      {
        path: 'business/registrazione',
        component: BusinessRegistrazionePage,
      },
      {
        path: 'business/contatti',
        component: BusinessContattiPage,
      },

      // Legal
      {
        path: 'privacy-policy',
        component: PrivacyPolicyPage,
      },
      {
        path: 'cookie-policy',
        component: CookiePolicyPage,
      },
      {
        path: 'termini-condizioni',
        component: TermsPage,
      },
    ],
  },

  // =============================================
  // Dashboard
  // =============================================
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardHomePage,
      },
      { path: 'carriera', component: CareerPage, canActivate: [carrieraGuard] },
      { path: 'appelli', component: ExamsPage, canActivate: [carrieraGuard] },
      {
        path: 'appelli/questionari/:adsceId',
        component: SurveyUnitsPage,
        canActivate: [carrieraGuard],
      },
      {
        path: 'appelli/questionari/:adsceId/compila',
        component: SurveyCompilationPage,
        canActivate: [carrieraGuard],
      },
      {
        path: 'agenda',
        component: AgendaPage,
      },
      {
        path: 'orario-lezioni',
        component: SchedulePage,
      },

      // ============================
      {
        path: 'sviluppi-futuri',
        component: RoadmapPage,
      },

      // ============================
      {
        path: 'messaggi',
        component: ChatPage,
      },

      // ============================
      {
        path: 'trasporti',
        component: TransportPage,
      },
      {
        path: 'aule',
        component: ClassroomsPage,
      },

      // ============================
      {
        path: 'portali',
        component: PortalsPage,
      },

      // Sidebar Footer
      {
        path: 'partner-universitari',
        component: UniversityPartnerPage,
      },
      {
        path: 'contatti-universitari',
        component: UniversityContactsPage,
      },
      { path: 'segreteria', component: SecretariatPage },
      {
        path: 'impostazioni',
        component: SettingsPage,
      },
      { path: 'profilo', component: ProfilePage },
    ],
  },

  // =============================================
  // Wildcard - 404
  // =============================================
  {
    path: '**',
    component: NotFoundPage,
  },
];
