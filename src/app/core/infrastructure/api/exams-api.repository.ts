import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@constants';
import { ExamsRepository } from '../../domain/repositories/exams.repository';
import {
  LegacyBookingRequest,
  LegacyBookingsResponse,
} from '../../domain/models/career/legacy-bookings.model';
import {
  BookableSessionsResponse,
  BookingsResponse,
} from '../../domain/models/career/sessions.model';
import { SurveysResponse } from '../../domain/models/career/surveys.model';
import { BookExamRequest, CancelBookingRequest } from '../../domain/models/career/book-exam.model';
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

@Injectable()
export class ExamsApiRepository extends ExamsRepository {
  private readonly http = inject(HttpClient);

  getSessions(cdsId: number, adId: number): Observable<BookableSessionsResponse> {
    const params = new HttpParams().set('cdsId', cdsId.toString()).set('adId', adId.toString());
    return this.http.get<BookableSessionsResponse>(API.exams.sessions, { params });
  }

  getBookableSessions(): Observable<BookableSessionsResponse> {
    return this.http.get<BookableSessionsResponse>(API.exams.bookable);
  }

  getBookings(): Observable<BookingsResponse> {
    return this.http.get<BookingsResponse>(API.exams.bookings);
  }

  getLegacyBookings(request: LegacyBookingRequest): Observable<LegacyBookingsResponse> {
    return this.http.post<LegacyBookingsResponse>(API.exams.legacyBookings, request);
  }

  getSurveys(): Observable<SurveysResponse> {
    return this.http.get<SurveysResponse>(API.exams.surveys);
  }

  bookExam(request: BookExamRequest): Observable<void> {
    const params = new HttpParams()
      .set('cdsId', request.cdsId.toString())
      .set('adId', request.adId.toString())
      .set('appId', request.appId.toString())
      .set('adsceId', request.adsceId.toString());
    return this.http.post<void>(API.exams.bookings, { password: request.password }, { params });
  }

  cancelBooking(request: CancelBookingRequest): Observable<void> {
    const params = new HttpParams()
      .set('cdsId', request.cdsId.toString())
      .set('adId', request.adId.toString())
      .set('appId', request.appId.toString());
    return this.http.post<void>(
      API.exams.cancelBooking,
      { password: request.password },
      { params },
    );
  }

  startSurvey(adsceId: number): Observable<SurveyStartResponse> {
    const params = new HttpParams().set('adsceId', adsceId.toString());
    return this.http.post<SurveyStartResponse>(API.exams.surveysStart, null, { params });
  }

  saveSurveyPage(request: SurveySaveRequest): Observable<void> {
    return this.http.post(API.exams.surveysSave, request, {
      responseType: 'text',
    }) as unknown as Observable<void>;
  }

  navigateSurvey(request: SurveyNavigateRequest): Observable<SurveyPage> {
    return this.http.post<SurveyPage>(API.exams.surveysNavigate, request);
  }

  confirmSurvey(request: SurveyConfirmRequest): Observable<void> {
    return this.http.post(API.exams.surveysConfirm, request, {
      responseType: 'text',
    }) as unknown as Observable<void>;
  }

  getSurveyPage(request: SurveyGetPageRequest): Observable<SurveyPage> {
    return this.http.post<SurveyPage>(API.exams.surveysPage, request);
  }

  getSurveySummary(request: SurveySummaryRequest): Observable<SurveySummaryResponse> {
    return this.http.post<SurveySummaryResponse>(API.exams.surveysSummary, request);
  }
}
