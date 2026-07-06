export interface CoursePlanExam {
  adCod: string;
  name: string;
  cfu: number;
  academicYear: number;
  period: string | null;
  mandatory: boolean;
}

export interface CoursePlanResponse {
  exams: CoursePlanExam[];
}
