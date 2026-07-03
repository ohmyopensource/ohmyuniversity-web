/**
 * Publicly available course catalog details for a teaching activity, fetched
 * lazily per exam when its accordion row is expanded.
 */
export interface CourseDetailResponse {
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
