export interface AgendaEventResponse {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  allDay: boolean;
  type: string;
  color: string | null;
  url: string | null;
  notes: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UniversityEventResponse {
  id: string;
  universityId: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  allDay: boolean;
  type: string;
  color: string | null;
  url: string | null;
  sourceUrl: string | null;
  publishedAt: string;
  imported: boolean;
}

export interface AgendaEventCreateRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  allDay?: boolean;
  type?: string;
  color?: string;
  url?: string;
  notes?: string;
  location?: string;
}
