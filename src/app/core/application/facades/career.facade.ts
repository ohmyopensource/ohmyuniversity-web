import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '@shared/types/dashboard/dashboard-career.types';
import { PersonaResponse } from 'src/app/core/domain/models/career/persona.model';
import { BadgeResponse } from 'src/app/core/domain/models/career/badge.model';
import { CareerInfoResponse } from '../../domain/models/career/career-info.model';
import { ExamHistoryResponse } from '../../domain/models/career/exam-history.model';
import { GradesResponse } from '../../domain/models/career/grades.model';
import {
  LegacyBookingRequest,
  LegacyBookingsResponse,
} from '../../domain/models/career/legacy-bookings.model';
import { RecommendationsResponse } from '../../domain/models/career/recommendations.model';
import {
  BookableSessionsResponse,
  BookingsResponse,
} from '../../domain/models/career/sessions.model';
import { StudyPlanResponse } from '../../domain/models/career/study-plan.model';
import { SurveysResponse, SurveyUnitsResponse } from '../../domain/models/career/surveys.model';
import { GetExamHistoryUseCase } from '../usecases/career/get-exam-history.usecase';
import { GetGradesUseCase } from '../usecases/career/get-grades.usecase';
import { GetRecommendationsUseCase } from '../usecases/career/get-recommendations.usecase';
import { GetStudyPlanUseCase } from '../usecases/career/get-study-plan.usecase';
import { GetTranscriptUseCase } from '../usecases/career/get-transcript.usecase';
import { GetBookableSessionsUseCase } from '../usecases/exams/get-bookable-sessions.usecase';
import { GetBookingsUseCase } from '../usecases/exams/get-bookings.usecase';
import { GetLegacyBookingsUseCase } from '../usecases/exams/get-legacy-bookings.usecase';
import { GetSurveysUseCase } from '../usecases/exams/get-surveys.usecase';
import { GetAvatarUseCase } from '../usecases/profile/get-avatar.usecase';
import { GetBadgeUseCase } from '../usecases/profile/get-badge.usecase';
import { GetCareerInfoUseCase } from '../usecases/profile/get-career-info.usecase';
import { GetPersonaUseCase } from '../usecases/profile/get-persona.usecase';
import { BookExamUseCase } from '../usecases/exams/book-exam.usecase';
import { CancelBookingUseCase } from '../usecases/exams/cancel-booking.usecase';
import { BookExamRequest, CancelBookingRequest } from '../../domain/models/career/book-exam.model';
import { StartSurveyUseCase } from '../usecases/exams/start-survey.usecase';
import { SaveSurveyPageUseCase } from '../usecases/exams/save-survey-page.usecase';
import { NavigateSurveyUseCase } from '../usecases/exams/navigate-survey.usecase';
import { ConfirmSurveyUseCase } from '../usecases/exams/confirm-survey.usecase';
import {
  SurveyStartResponse,
  SurveySaveRequest,
  SurveyNavigateRequest,
  SurveyConfirmRequest,
  SurveyPage,
  SurveySummaryRequest,
  SurveySummaryResponse,
  SurveyGetPageRequest,
} from '../../domain/models/career/survey-compilation.model';
import { GetSurveySummaryUseCase } from '../usecases/exams/get-survey-summary.usecase';
import { GetSurveyPageUseCase } from '../usecases/exams/get-survey-page.usecase';
import { GetSurveyUnitsUseCase } from '../usecases/exams/get-survey-units.usecase';
import { GetCourseDetailUseCase } from '../usecases/career/get-course-detail.usecase';
import { CourseDetailResponse } from '../../domain/models/career/course-detail.model';
import { CourseSyllabusResponse } from '../../domain/models/career/course-syllabus.model';
import { GetCourseSyllabusUseCase } from '../usecases/career/get-course-syllabus.usecase';

@Injectable()
export class CareerFacade {
  private readonly getTranscriptUseCase = inject(GetTranscriptUseCase);
  private readonly getGradesUseCase = inject(GetGradesUseCase);
  private readonly getStudyPlanUseCase = inject(GetStudyPlanUseCase);
  private readonly getExamHistoryUseCase = inject(GetExamHistoryUseCase);
  private readonly getRecommendationsUseCase = inject(GetRecommendationsUseCase);
  private readonly getPersonaUseCase = inject(GetPersonaUseCase);
  private readonly getCareerInfoUseCase = inject(GetCareerInfoUseCase);
  private readonly getAvatarUseCase = inject(GetAvatarUseCase);
  private readonly getBadgeUseCase = inject(GetBadgeUseCase);
  private readonly getBookableSessionsUseCase = inject(GetBookableSessionsUseCase);
  private readonly getBookingsUseCase = inject(GetBookingsUseCase);
  private readonly getLegacyBookingsUseCase = inject(GetLegacyBookingsUseCase);
  private readonly getSurveysUseCase = inject(GetSurveysUseCase);
  private readonly getSurveyUnitsUseCase = inject(GetSurveyUnitsUseCase);
  private readonly bookExamUseCase = inject(BookExamUseCase);
  private readonly cancelBookingUseCase = inject(CancelBookingUseCase);
  private readonly startSurveyUseCase = inject(StartSurveyUseCase);
  private readonly saveSurveyPageUseCase = inject(SaveSurveyPageUseCase);
  private readonly navigateSurveyUseCase = inject(NavigateSurveyUseCase);
  private readonly confirmSurveyUseCase = inject(ConfirmSurveyUseCase);
  private readonly getSurveyPageUseCase = inject(GetSurveyPageUseCase);
  private readonly getSurveySummaryUseCase = inject(GetSurveySummaryUseCase);
  private readonly getCourseDetailUseCase = inject(GetCourseDetailUseCase);
  private readonly getCourseSyllabusUseCase = inject(GetCourseSyllabusUseCase);

  getTranscript(): Observable<Exam[]> {
    return this.getTranscriptUseCase.execute();
  }

  getGrades(): Observable<GradesResponse> {
    return this.getGradesUseCase.execute();
  }

  getStudyPlan(): Observable<StudyPlanResponse> {
    return this.getStudyPlanUseCase.execute();
  }

  getExamHistory(): Observable<ExamHistoryResponse> {
    return this.getExamHistoryUseCase.execute();
  }

  getRecommendations(): Observable<RecommendationsResponse> {
    return this.getRecommendationsUseCase.execute();
  }

  getPersona(): Observable<PersonaResponse> {
    return this.getPersonaUseCase.execute();
  }

  getCareerInfo(): Observable<CareerInfoResponse> {
    return this.getCareerInfoUseCase.execute();
  }

  getAvatar(): Observable<Blob> {
    return this.getAvatarUseCase.execute();
  }

  getBadge(): Observable<BadgeResponse> {
    return this.getBadgeUseCase.execute();
  }

  getBookableSessions(): Observable<BookableSessionsResponse> {
    return this.getBookableSessionsUseCase.execute();
  }

  getBookings(): Observable<BookingsResponse> {
    return this.getBookingsUseCase.execute();
  }

  getLegacyBookings(request: LegacyBookingRequest): Observable<LegacyBookingsResponse> {
    return this.getLegacyBookingsUseCase.execute(request);
  }

  getSurveys(): Observable<SurveysResponse> {
    return this.getSurveysUseCase.execute();
  }

  bookExam(request: BookExamRequest): Observable<void> {
    return this.bookExamUseCase.execute(request);
  }

  cancelBooking(request: CancelBookingRequest): Observable<void> {
    return this.cancelBookingUseCase.execute(request);
  }

  startSurvey(adsceId: number, tags?: string): Observable<SurveyStartResponse> {
    return this.startSurveyUseCase.execute(adsceId, tags);
  }

  getSurveyUnits(adsceId: number): Observable<SurveyUnitsResponse> {
    return this.getSurveyUnitsUseCase.execute(adsceId);
  }

  saveSurveyPage(request: SurveySaveRequest): Observable<void> {
    return this.saveSurveyPageUseCase.execute(request);
  }

  navigateSurvey(request: SurveyNavigateRequest): Observable<SurveyPage> {
    return this.navigateSurveyUseCase.execute(request);
  }

  confirmSurvey(request: SurveyConfirmRequest): Observable<void> {
    return this.confirmSurveyUseCase.execute(request);
  }

  getSurveyPage(request: SurveyGetPageRequest): Observable<SurveyPage> {
    return this.getSurveyPageUseCase.execute(request);
  }

  getSurveySummary(request: SurveySummaryRequest): Observable<SurveySummaryResponse> {
    return this.getSurveySummaryUseCase.execute(request);
  }

  getCourseDetail(
    adCod: string,
    cdsCod: string,
    aaOffId?: number,
    cdsOffId?: number,
  ): Observable<CourseDetailResponse> {
    return this.getCourseDetailUseCase.execute(adCod, cdsCod, aaOffId, cdsOffId);
  }

  getCourseSyllabus(adCod: string): Observable<CourseSyllabusResponse> {
    return this.getCourseSyllabusUseCase.execute(adCod);
  }
}
