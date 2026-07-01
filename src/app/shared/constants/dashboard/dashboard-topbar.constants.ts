/**
 * @file dashboard-topbar.constants.ts
 * @description Label mappings for breadcrumb segments and tab query params
 * used by the dashboard topbar component.
 */

/**
 * Maps URL path segments to their human-readable breadcrumb labels.
 * Add new entries here when new dashboard pages are created.
 */
export const SEGMENT_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  roadmap: 'Sviluppi Futuri',
  partner: 'Partner',
  chat: 'Messaggi',
  settings: 'Impostazioni',
  profile: 'Profilo',
  secretariat: 'Segreteria',
  career: 'Carriera',
  exams: 'Esami',
  questionnaires: 'Questionari',
  agenda: 'Agenda',
  schedule: 'Orario',
  classrooms: 'Aule',
  transport: 'Trasporti',
};

/**
 * Maps tab query param values to their human-readable breadcrumb labels.
 * Add new entries here when new tabs are introduced in any dashboard page.
 */
export const TAB_LABELS: Record<string, string> = {
  // Exams
  overview: 'Panoramica',
  suggested: 'Suggeriti',
  questionnaires: 'Questionari',

  // Transport
  public: 'Trasporto pubblico',
  companies: 'Aziende locali',

  // Contacts
  secretariat: 'Segreteria',
  teachers: 'Docenti',
  'useful-numbers': 'Numeri utili',

  // Secretariat
  scholarships: 'Borse di studio',
  forms: 'Modulistica',
  bandi: 'Bandi e concorsi',
  internships: 'Tirocini',
  fees: 'Tasse',

  // Profile
  information: 'Informazioni',
  'study-plan': 'Corso di studi',
  security: 'Sicurezza',
};
