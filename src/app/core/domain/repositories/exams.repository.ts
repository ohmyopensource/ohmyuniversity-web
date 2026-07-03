import { Observable } from 'rxjs';
import { BookableSessionsResponse, BookingsResponse } from '../models/career/sessions.model';
import {
  LegacyBookingRequest,
  LegacyBookingsResponse,
} from '../models/career/legacy-bookings.model';
import { SurveysResponse, SurveyUnitsResponse } from '../models/career/surveys.model';
import { BookExamRequest, CancelBookingRequest } from '../models/career/book-exam.model';
import {
  SurveyStartResponse,
  SurveySaveRequest,
  SurveyNavigateRequest,
  SurveyConfirmRequest,
  SurveyPage,
  SurveySummaryRequest,
  SurveySummaryResponse,
  SurveyGetPageRequest,
} from '../models/career/survey-compilation.model';

export abstract class ExamsRepository {
  abstract getSessions(cdsId: number, adId: number): Observable<BookableSessionsResponse>;
  abstract getBookableSessions(): Observable<BookableSessionsResponse>;
  abstract getBookings(): Observable<BookingsResponse>;
  abstract getLegacyBookings(request: LegacyBookingRequest): Observable<LegacyBookingsResponse>;
  abstract getSurveys(): Observable<SurveysResponse>;
  abstract getSurveyUnits(adsceId: number): Observable<SurveyUnitsResponse>;
  abstract bookExam(request: BookExamRequest): Observable<void>;
  abstract cancelBooking(request: CancelBookingRequest): Observable<void>;
  abstract startSurvey(adsceId: number, tags?: string): Observable<SurveyStartResponse>;
  abstract saveSurveyPage(request: SurveySaveRequest): Observable<void>;
  abstract navigateSurvey(request: SurveyNavigateRequest): Observable<SurveyPage>;
  abstract confirmSurvey(request: SurveyConfirmRequest): Observable<void>;
  abstract getSurveyPage(request: SurveyGetPageRequest): Observable<SurveyPage>;
  abstract getSurveySummary(request: SurveySummaryRequest): Observable<SurveySummaryResponse>;
}
