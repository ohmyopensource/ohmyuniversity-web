/** Possible states of an exam booking lifecycle */
export type BookingExamStatus = 'open' | 'closing' | 'closed' | 'upcoming' | 'booked' | 'no-exam';

/** Possible states of a course questionnaire */
export type QuestionnaireStatus = 'pending' | 'completed';

/** Shared base for academic entities tied to a course (exams, questionnaires, etc.) */
export interface CourseEvent<TStatus = string> {
  id: string;
  courseName: string;
  professor: string;
  status: TStatus;
}

/** Bookable exam for a course, with date, location and seat availability */
export interface Exam extends CourseEvent<BookingExamStatus> {
  courseAcronym: string;
  date: string;
  time: string;
  location: string;
  building: string;
  enrollDeadline: string;
  spotsTotal: number;
  spotsLeft: number;
  cfu: number;
  year: number;
  cdsId?: number;
  adId?: number;
  appId?: number;
  adsceId?: number;
  position?: number;
  bookingDate?: string;
}

/** Course evaluation questionnaire to be filled out by a deadline */
export interface Questionnaire extends CourseEvent<QuestionnaireStatus> {
  type: string;
  deadline: string;
  completedAt?: string;
}
