import { Identifiable } from '@shared/types';

/**
 * A department/faculty contact card, backed by real Cineca struttura-service
 * data (public, no auth required, no student-specific filtering).
 */
export interface DepartmentContact {
  facId: number;
  name: string;
  nameEng: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  website: string | null;
  sedeIds: number[];
}

/**
 * A professor contact derived from the student's own exams/courses.
 */
export interface ProfessorContact extends Identifiable {
  name: string;
  courses: string[];
}

/** A single physical location option used to filter department contacts. */
export interface ContactCampusOption {
  id: number;
  label: string;
}
