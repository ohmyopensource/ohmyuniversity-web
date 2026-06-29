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
}
