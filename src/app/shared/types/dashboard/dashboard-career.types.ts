import { OptionBase } from '@shared/types';

/** Represents whether a student has passed an exam or still needs to take it. */
export type ExamStatus = 'PASSED' | 'TO_TAKE';

/** Distinguishes between mandatory curriculum exams and freely chosen electives. */
export type ExamCategory = 'MANDATORY' | 'ELECTIVE';

/** Filter values available in the exam list view. */
export type ExamFilter = 'ALL' | 'PASSED' | 'TO_TAKE';

/** Direction of a statistical trend over time. */
export type TrendDirection = 'up' | 'down' | 'flat';

/** Exam modality: written test or oral interview. */
export type SessionType = 'WRITTEN' | 'ORAL';

/** Booking state of a single exam slot. */
export type BookingStatus = 'AVAILABLE' | 'BOOKED' | 'CLOSED';

/** Academic calendar session. */
export type AcademicSession = 'SUMMER' | 'WINTER' | 'EXTRAORDINARY';

/** Filter applied to the academic session column. */
export type SessionFilter = 'ALL' | AcademicSession;

/** Filter applied to the exam modality column. */
export type TypeFilter = 'ALL' | SessionType;

/**
 * Teaching period, stored in English internally for scalability/i18n.
 * Mapped to Italian labels in the UI via TEACHING_PERIOD_LABELS.
 */
export type TeachingPeriod = 'FIRST_SEMESTER' | 'SECOND_SEMESTER' | 'ANNUAL';

/**
 * Attendance requirement, stored in English internally.
 * Mapped to Italian labels in the UI via ATTENDANCE_LABELS.
 */
export type AttendanceType = 'MANDATORY' | 'NOT_MANDATORY';

/** A single CFU-by-CFU program breakdown entry. */
export interface CfuBreakdownItem {
  cfuNumber: number;
  description: string;
}

/** A single exam entry in the student's academic record. */
export interface Exam {
  courseCode: string;
  courseName: string;
  academicYear: number;
  cfu: number;
  status: ExamStatus;
  grade: string;
  simulatedGrade?: number;
  gradable: boolean;
  category: ExamCategory;
  prerequisites: string[];
  adId?: number;
  cdsId?: number;
  aaOffId?: number;
  detail?: CourseDetail;
  detailLoading?: boolean;
  detailError?: boolean;
}

/** Publicly available course catalog details, fetched lazily per exam. */
export interface CourseDetail {
  period: string | null;
  location: string | null;
  teachingStartDate: string | null;
  teachingEndDate: string | null;
  teachingLanguage: string | null;
  examType: string | null;
  evaluationType: string | null;
  mandatory: boolean | null;
  coursePageUrl: string | null;
}

/** Descriptor for a selectable exam list filter option. */
export type FilterOption = OptionBase<ExamFilter>;

/** A group of exams belonging to the same academic year, with aggregated stats. */
export interface ExamGroup {
  year: number;
  yearLabel: string;
  exams: Exam[];
  passedCount: number;
}

/** A single data point rendered in a trend or progress chart. */
export interface ChartPoint {
  value: number;
  isLast: boolean;
}

/** A single bookable exam slot in the student's study plan. */
export interface ExamSlot {
  id: string;
  courseCode: string;
  courseName: string;
  professor: string;
  date: string;
  time: string;
  type: SessionType;
  status: BookingStatus;
  session: AcademicSession;
  location: string;
  maxEnrollments: number;
  currentEnrollments: number;
}

/** Descriptor for session filter tabs. */
export type SessionFilterOption = OptionBase<SessionFilter>;

/** Descriptor for exam-type filter tabs. */
export type TypeFilterOption = OptionBase<TypeFilter>;

export type GradeValue = number | 'L';
