import { environment } from '@environments/environment';

const BASE = environment.apiUrl;

export const API = {
  auth: {
    login: `${BASE}/v1/auth/login`,
    refresh: `${BASE}/v1/auth/refresh`,
    logout: `${BASE}/v1/auth/logout`,
    switchCarriera: `${BASE}/v1/auth/switch-carriera`,
    switchUniversity: `${BASE}/v1/auth/switch-university`,
  },
  profile: {
    persona: `${BASE}/v1/profile/persona`,
    info: `${BASE}/v1/profile/info`,
    avatar: `${BASE}/v1/profile/avatar`,
    badge: `${BASE}/v1/profile/badge`,
  },
  career: {
    transcript: `${BASE}/v1/career/transcript`,
    grades: `${BASE}/v1/career/grades`,
    studyPlan: `${BASE}/v1/career/study-plan`,
    examHistory: `${BASE}/v1/career/exam-history`,
    recommendations: `${BASE}/v1/career/recommendations`,
  },
  courseCatalogue: {
    plan: `${BASE}/v1/course-catalogue/plan`,
    syllabus: `${BASE}/v1/course-catalogue/syllabus`,
  },
  exams: {
    sessions: `${BASE}/v1/exams/sessions`,
    bookable: `${BASE}/v1/exams/bookable`,
    bookings: `${BASE}/v1/exams/bookings`,
    cancelBooking: `${BASE}/v1/exams/bookings/cancel`,
    legacyBookings: `${BASE}/v1/exams/bookings/legacy`,
    surveys: `${BASE}/v1/exams/surveys`,
    surveysUnits: (adsceId: number) => `${BASE}/v1/exams/surveys/${adsceId}/units`,
    surveysStart: `${BASE}/v1/exams/surveys/start`,
    surveysSave: `${BASE}/v1/exams/surveys/save`,
    surveysNavigate: `${BASE}/v1/exams/surveys/navigate`,
    surveysConfirm: `${BASE}/v1/exams/surveys/confirm`,
    surveysPage: `${BASE}/v1/exams/surveys/page`,
    surveysSummary: `${BASE}/v1/exams/surveys/summary`,
    courseDetail: `${BASE}/v1/exams/course-detail`,
  },
  fees: {
    status: `${BASE}/v1/fees/status`,
    invoices: `${BASE}/v1/fees/invoices`,
    refunds: `${BASE}/v1/fees/refunds`,
  },
  internships: {
    applications: `${BASE}/v1/internships/applications`,
  },
  university: {
    externalServices: `${BASE}/v1/university/external-services`,
  },
  email: {
    authUrl: `${BASE}/v1/email/auth/url`,
    inbox: `${BASE}/v1/email/inbox`,
  },
  agenda: {
    events: `${BASE}/v1/agenda/events`,
    universityEvents: `${BASE}/v1/agenda/university-events`,
    importEvent: (id: string) => `${BASE}/v1/agenda/university-events/${id}/import`,
    event: (id: string) => `${BASE}/v1/agenda/events/${id}`,
  },
  fetcher: {
    timetables: `${BASE}/v1/fetcher/timetables`,
  },
} as const;
