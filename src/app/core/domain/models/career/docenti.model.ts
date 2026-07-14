/** Minimal professor entry for the list view (GET /course-catalogue/docenti). */
export interface DocenteSummary {
  id: string | null;
  name: string;
  profilePageUrl: string | null;
  hasDetail: boolean;
}

export interface DocentiListResponse {
  docenti: DocenteSummary[];
}

/** A single course taught by a professor, flagged if it's in the requesting student's own career. */
export interface TaughtCourse {
  name: string;
  degreeCourseName: string;
  degreeCourseType: string;
  inStudentCareer: boolean;
}

/** Full professor detail (GET /course-catalogue/docenti/{docenteId}). */
export interface DocenteDetailResponse {
  name: string;
  role: string | null;
  email: string | null;
  department: string | null;
  profilePageUrl: string | null;
  biography: string | null;
  publications: string | null;
  notes: string | null;
  courses: TaughtCourse[];
}
