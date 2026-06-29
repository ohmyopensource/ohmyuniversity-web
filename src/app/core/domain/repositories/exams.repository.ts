import { Observable } from 'rxjs';
import { BookableSessionsResponse, BookingsResponse } from '../models/career/sessions.model';
import {
  LegacyBookingRequest,
  LegacyBookingsResponse,
} from '../models/career/legacy-bookings.model';
import { SurveysResponse } from '../models/career/surveys.model';
import { BookExamRequest, CancelBookingRequest } from '../models/career/book-exam.model';

export abstract class ExamsRepository {
  abstract getSessions(cdsId: number, adId: number): Observable<BookableSessionsResponse>;
  abstract getBookableSessions(): Observable<BookableSessionsResponse>;
  abstract getBookings(): Observable<BookingsResponse>;
  abstract getLegacyBookings(request: LegacyBookingRequest): Observable<LegacyBookingsResponse>;
  abstract getSurveys(): Observable<SurveysResponse>;
  abstract bookExam(request: BookExamRequest): Observable<void>;
  abstract cancelBooking(request: CancelBookingRequest): Observable<void>;
}
