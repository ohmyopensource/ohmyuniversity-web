export interface InternshipApplication {
  domTiroId: number;
  domTiroPrg: number;
  academicYear: number;
  statusCode: string;
  statusDescription: string;
  internshipTypeCode: string;
  internshipTypeDescription: string;
  organizationId: number;
  organizationName: string;
  opportunityTitle: string;
  opportunityDescription: string;
  startDate: string;
  durationMonths: number;
  cfuRecognitionEnabled: number;
}

export interface InternshipApplicationResponse {
  applications: InternshipApplication[];
}
