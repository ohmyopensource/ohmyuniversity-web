export interface CfuBreakdownItem {
  moduleName: string;
  cfu: number | null;
  content: string | null;
  professors: string[];
}

export interface CourseSyllabusResponse {
  prerequisites: string | null;
  cfuBreakdown: CfuBreakdownItem[] | null;
}
