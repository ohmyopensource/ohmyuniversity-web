import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

// Repositories - domain
import { AuthRepository } from './core/domain/repositories/auth.repository';
import { CalendarRepository } from './core/domain/repositories/calendar.repository';
import { TimetableRepository } from './core/domain/repositories/timetable.repository';
import { ProfileRepository } from './core/domain/repositories/profile.repository';
import { CareerRepository } from './core/domain/repositories/career.repository';
import { ExamsRepository } from './core/domain/repositories/exams.repository';
import { FeesRepository } from './core/domain/repositories/fees.repository';

// Repositories - infrastructure
import { AuthApiRepository } from './core/infrastructure/api/auth-api.repository';
import { AgendaApiRepository } from './core/infrastructure/api/agenda-api.repository';
import { TimetableApiRepository } from './core/infrastructure/api/timetable-api.repository';
import { ProfileApiRepository } from './core/infrastructure/api/profile-api.repository';
import { CareerApiRepository } from './core/infrastructure/api/career-api.repository';
import { CourseCatalogueApiRepository } from './core/infrastructure/api/course-catalogue-api.repository';
import { ExamsApiRepository } from './core/infrastructure/api/exams-api.repository';
import { FeesApiRepository } from './core/infrastructure/api/fees-api.repository';
import { InternshipsRepository } from './core/domain/repositories/internships.repository';
import { InternshipsApiRepository } from './core/infrastructure/api/internships-api.repository';

// Facades
import { AuthFacade } from './core/application/facades/auth.facade';
import { CareerFacade } from './core/application/facades/career.facade';
import { FeesFacade } from './core/application/facades/fees.facade';
import { InternshipsFacade } from './core/application/facades/internships.facade';
import { CalendarFacade } from './core/application/facades/calendar.facade';
import { TimetableFacade } from './core/application/facades/timetable.facade';

// Auth usecases
import { LoginUseCase } from './core/application/usecases/auth/login.usecase';
import { LogoutUseCase } from './core/application/usecases/auth/logout.usecase';
import { RefreshTokenUseCase } from './core/application/usecases/auth/refresh-token.usecase';
import { SwitchCarrieraUseCase } from './core/application/usecases/career/switch-carriera.usecase';
import { GetSessionsUseCase } from './core/application/usecases/auth/get-sessions.usecase';
import { RevokeSessionUseCase } from './core/application/usecases/auth/revoke-session.usecase';

// Profile usecases
import { GetPersonaUseCase } from './core/application/usecases/profile/get-persona.usecase';
import { GetCareerInfoUseCase } from './core/application/usecases/profile/get-career-info.usecase';
import { GetAvatarUseCase } from './core/application/usecases/profile/get-avatar.usecase';
import { GetBadgeUseCase } from './core/application/usecases/profile/get-badge.usecase';

// Career usecases
import { GetTranscriptUseCase } from './core/application/usecases/career/get-transcript.usecase';
import { GetGradesUseCase } from './core/application/usecases/career/get-grades.usecase';
import { GetStudyPlanUseCase } from './core/application/usecases/career/get-study-plan.usecase';
import { GetExamHistoryUseCase } from './core/application/usecases/career/get-exam-history.usecase';
import { GetRecommendationsUseCase } from './core/application/usecases/career/get-recommendations.usecase';
import { GetCourseDetailUseCase } from './core/application/usecases/career/get-course-detail.usecase';
import { CourseCatalogueRepository } from './core/domain/repositories/course-catalogue.repository';
import { GetCourseSyllabusUseCase } from './core/application/usecases/career/get-course-syllabus.usecase';

// Exams usecases
import { GetBookableSessionsUseCase } from './core/application/usecases/exams/get-bookable-sessions.usecase';
import { GetBookingsUseCase } from './core/application/usecases/exams/get-bookings.usecase';
import { GetLegacyBookingsUseCase } from './core/application/usecases/exams/get-legacy-bookings.usecase';
import { GetSurveysUseCase } from './core/application/usecases/exams/get-surveys.usecase';
import { BookExamUseCase } from './core/application/usecases/exams/book-exam.usecase';
import { CancelBookingUseCase } from './core/application/usecases/exams/cancel-booking.usecase';
import { StartSurveyUseCase } from './core/application/usecases/exams/start-survey.usecase';
import { SaveSurveyPageUseCase } from './core/application/usecases/exams/save-survey-page.usecase';
import { NavigateSurveyUseCase } from './core/application/usecases/exams/navigate-survey.usecase';
import { ConfirmSurveyUseCase } from './core/application/usecases/exams/confirm-survey.usecase';
import { GetSurveyPageUseCase } from './core/application/usecases/exams/get-survey-page.usecase';
import { GetSurveySummaryUseCase } from './core/application/usecases/exams/get-survey-summary.usecase';
import { GetSurveyUnitsUseCase } from './core/application/usecases/exams/get-survey-units.usecase';

// Fees usecases
import { GetFeesStatusUseCase } from './core/application/usecases/fees/get-fees-status.usecase';
import { GetInvoicesUseCase } from './core/application/usecases/fees/get-invoices.usecase';
import { GetRefundsUseCase } from './core/application/usecases/fees/get-refunds.usecase';

// Internships usecases
import { GetInternshipApplicationsUseCase } from './core/application/usecases/internships/get-internship-applications.usecase';

import {
  provideLucideIcons,
  LucideLayoutDashboard,
  LucideGraduationCap,
  LucideCalendarDays,
  LucideFilePenLine,
  LucideFolderOpen,
  LucideBadgeEuro,
  LucideBriefcase,
  LucideMessageSquare,
  LucideCompass,
  LucideSettings,
  LucideCircleUser,
  LucideLogOut,
  LucidePanelLeftClose,
  LucidePanelLeftOpen,
  LucideBell,
  LucideChevronUp,
  LucideX,
  LucideLoaderCircle,
  LucideDownload,
  LucideArrowRight,
  LucideTrash2,
  LucideCircleCheck,
  LucideHeart,
  LucideStar,
  LucideSearch,
  LucideShare2,
  LucidePlus,
  LucideShield,
  LucideTriangleAlert,
  LucideCircleX,
  LucideInfo,
  LucideTag,
  LucideFlame,
  LucideClock,
  LucideWifi,
  LucideFunnel,
  LucideSend,
  LucidePaperclip,
  LucideFile,
  LucideLink,
  LucideUsers,
  LucideArrowLeft,
  LucideChevronRight,
  LucideUser,
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideCalendar,
  LucidePencil,
  LucideBookOpen,
  LucideAward,
  LucideKey,
  LucideCamera,
  LucideExternalLink,
  LucideBuilding2,
  LucideMap,
  LucideCalendarPlus,
  LucideLayers,
  LucideMonitor,
  LucideZap,
  LucideWallet,
  LucideCalendarCheck,
  LucideCalendarX,
  LucideClipboardList,
  LucideClipboardCheck,
  LucideHeadphones,
  LucideMegaphone,
  LucideCreditCard,
  LucideCircleAlert,
  LucideEuro,
  LucideBookMarked,
  LucideThumbsUp,
  LucideSun,
  LucideSparkles,
  LucideCalculator,
  LucideHourglass,
  LucideLibrary,
} from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),

    // Repository bindings
    { provide: AuthRepository, useClass: AuthApiRepository },
    { provide: CalendarRepository, useClass: AgendaApiRepository },
    { provide: TimetableRepository, useClass: TimetableApiRepository },
    { provide: ProfileRepository, useClass: ProfileApiRepository },
    { provide: CareerRepository, useClass: CareerApiRepository },
    { provide: CourseCatalogueRepository, useClass: CourseCatalogueApiRepository },
    { provide: ExamsRepository, useClass: ExamsApiRepository },
    { provide: FeesRepository, useClass: FeesApiRepository },
    { provide: InternshipsRepository, useClass: InternshipsApiRepository },

    // Facades
    AuthFacade,
    CareerFacade,
    FeesFacade,
    CalendarFacade,
    TimetableFacade,

    // Auth
    LoginUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    SwitchCarrieraUseCase,
    GetSessionsUseCase,
    RevokeSessionUseCase,

    // Profile
    GetPersonaUseCase,
    GetCareerInfoUseCase,
    GetAvatarUseCase,
    GetBadgeUseCase,

    // Career
    GetTranscriptUseCase,
    GetGradesUseCase,
    GetStudyPlanUseCase,
    GetExamHistoryUseCase,
    GetRecommendationsUseCase,
    GetCourseDetailUseCase,
    GetCourseSyllabusUseCase,

    // Exams
    GetBookableSessionsUseCase,
    GetBookingsUseCase,
    GetLegacyBookingsUseCase,
    GetSurveysUseCase,
    BookExamUseCase,
    CancelBookingUseCase,
    StartSurveyUseCase,
    SaveSurveyPageUseCase,
    NavigateSurveyUseCase,
    ConfirmSurveyUseCase,
    GetSurveyPageUseCase,
    GetSurveySummaryUseCase,
    GetSurveyUnitsUseCase,

    // Fees
    GetFeesStatusUseCase,
    GetInvoicesUseCase,
    GetRefundsUseCase,

    // Internships
    InternshipsFacade,
    GetInternshipApplicationsUseCase,

    provideLucideIcons(
      LucideLayoutDashboard,
      LucideGraduationCap,
      LucideCalendarDays,
      LucideFilePenLine,
      LucideFolderOpen,
      LucideBadgeEuro,
      LucideBriefcase,
      LucideMessageSquare,
      LucideCompass,
      LucideSettings,
      LucideCircleUser,
      LucideLogOut,
      LucidePanelLeftClose,
      LucidePanelLeftOpen,
      LucideBell,
      LucideChevronUp,
      LucideX,
      LucideLoaderCircle,
      LucideDownload,
      LucideArrowRight,
      LucideTrash2,
      LucideCircleCheck,
      LucideHeart,
      LucideStar,
      LucideSearch,
      LucideShare2,
      LucidePlus,
      LucideShield,
      LucideTriangleAlert,
      LucideCircleX,
      LucideInfo,
      LucideTag,
      LucideFlame,
      LucideClock,
      LucideWifi,
      LucideFunnel,
      LucideSend,
      LucidePaperclip,
      LucideFile,
      LucideLink,
      LucideUsers,
      LucideArrowLeft,
      LucideChevronRight,
      LucideUser,
      LucideMail,
      LucidePhone,
      LucideMapPin,
      LucideCalendar,
      LucidePencil,
      LucideBookOpen,
      LucideAward,
      LucideKey,
      LucideCamera,
      LucideExternalLink,
      LucideBuilding2,
      LucideMap,
      LucideCalendarPlus,
      LucideLayers,
      LucideMonitor,
      LucideZap,
      LucideWallet,
      LucideCalendarCheck,
      LucideCalendarX,
      LucideClipboardList,
      LucideClipboardCheck,
      LucideHeadphones,
      LucideMegaphone,
      LucideCreditCard,
      LucideCircleAlert,
      LucideEuro,
      LucideBookMarked,
      LucideThumbsUp,
      LucideSun,
      LucideSparkles,
      LucideCalculator,
      LucideHourglass,
      LucideLibrary,
    ),
  ],
};
