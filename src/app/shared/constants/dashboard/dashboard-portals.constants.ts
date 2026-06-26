import { Portal } from '@shared/types';

/**
 * Static portal definitions for OhMyUniversity.
 *
 * University-specific URLs (ESSE3, Moodle, library, email) are injected
 * dynamically from the backend at runtime via ExternalServicesController.
 * Everything else lives here.
 *
 * Links are grouped by category and should be kept up to date manually.
 */
export const STATIC_PORTALS: Portal[] = [
  // Secretariat
  {
    id: 'esse3',
    name: 'ESSE3 - Cineca',
    description:
      'Portale ufficiale per iscrizioni, pagamento tasse, piano di studi e gestione carriera universitaria.',
    url: '', // injected at runtime from backend esse3PortalUrl
    category: 'segreteria',
    tags: ['iscrizione', 'tasse', 'carriera', 'libretto'],
    featured: true,
  },
  {
    id: 'ateneo',
    name: 'Portale di Ateneo',
    description:
      "Sito ufficiale dell'università con news, bandi, regolamenti e informazioni istituzionali.",
    url: 'https://www.unimol.it',
    category: 'segreteria',
    tags: ['notizie', 'bandi', 'regolamenti'],
  },
  {
    id: 'sportello',
    name: 'Sportello Online',
    description:
      'Servizi online per studenti: pratiche amministrative, certificati e richieste alla segreteria.',
    url: 'https://www3.unimol.it/servizi/servizi-on-line/studenti',
    category: 'segreteria',
    tags: ['appuntamenti', 'segreteria', 'pratiche', 'certificati'],
  },
  {
    id: 'pagopa',
    name: 'PagoPA',
    description: 'Pagamento online delle tasse universitarie tramite il sistema PagoPA.',
    url: 'https://www.pagopa.gov.it',
    category: 'segreteria',
    tags: ['pagamento', 'tasse', 'bollettino'],
  },

  // Didactics
  {
    id: 'moodle',
    name: 'Moodle',
    description:
      'Piattaforma e-learning per accedere ai materiali didattici, consegna elaborati e forum dei corsi.',
    url: '', // injected at runtime from backend moodleUrl
    category: 'didattica',
    tags: ['materiali', 'corsi', 'esercizi', 'forum'],
    featured: true,
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description:
      'Piattaforma per lezioni in streaming, riunioni con docenti e collaborazione tra studenti.',
    url: 'https://teams.microsoft.com',
    category: 'didattica',
    tags: ['lezioni', 'streaming', 'riunioni'],
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    description: 'Gestione classi virtuali, consegna compiti e feedback dai docenti.',
    url: 'https://classroom.google.com',
    category: 'didattica',
    tags: ['compiti', 'classi virtuali', 'feedback'],
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca Digitale',
    description:
      'Accesso a riviste scientifiche, libri digitali, banche dati e risorse accademiche.',
    url: '', // injected at runtime from backend libraryUrl
    category: 'didattica',
    tags: ['libri', 'riviste', 'banche dati', 'ricerca'],
  },

  // Email & Communication
  {
    id: 'outlook',
    name: 'Outlook - Microsoft 365',
    description:
      'Email istituzionale, calendario, OneDrive e suite Office online per studenti e docenti.',
    url: 'https://outlook.office.com',
    category: 'email',
    tags: ['email', 'calendario', 'office', 'onedrive'],
    featured: true,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description:
      'Accesso rapido a Gmail per chi utilizza un account Google personale o istituzionale.',
    url: 'https://mail.google.com',
    category: 'email',
    tags: ['email', 'google', 'posta'],
  },
  {
    id: 'protonmail',
    name: 'ProtonMail',
    description: 'Provider email sicuro e privato, utile per comunicazioni riservate.',
    url: 'https://proton.me/mail',
    category: 'email',
    tags: ['email', 'privacy', 'sicurezza'],
  },

  // Services
  {
    id: 'esu',
    name: 'ESU Molise - Borse di Studio',
    description:
      'Portale per domande di borsa di studio, alloggi universitari e servizi per il diritto allo studio.',
    url: 'https://www.esu.molise.it',
    category: 'borse',
    tags: ['borsa di studio', 'alloggio', 'diritto allo studio'],
    featured: true,
  },
  {
    id: 'mensa',
    name: 'Servizio Mensa ESU',
    description: 'Informazioni sul servizio mensa per studenti universitari in Molise.',
    url: 'https://www.esu.molise.it/avvisi-per-gli-studenti/servizio-mensa.html',
    category: 'borse',
    tags: ['mensa', 'pasti', 'orari'],
  },
  {
    id: 'inps-studenti',
    name: 'INPS - Bonus Studenti',
    description:
      'Portale INPS per accedere a bonus e agevolazioni dedicate agli studenti universitari.',
    url: 'https://www.inps.it',
    category: 'borse',
    tags: ['bonus', 'agevolazioni', 'inps'],
  },
  {
    id: 'trasporti-agevolati',
    name: 'Trasporti Agevolati',
    description:
      'Richiesta di abbonamenti agevolati per il trasporto pubblico dedicati agli studenti universitari.',
    url: 'https://www.regione.molise.it/trasporti',
    category: 'borse',
    tags: ['abbonamento', 'bus', 'agevolazione', 'trasporto'],
  },

  // Career
  {
    id: 'almalaurea',
    name: 'AlmaLaurea',
    description:
      'CV online e statistiche occupazionali per laureati italiani. Profilo professionale interuniversitario.',
    url: 'https://www.almalaurea.it',
    category: 'carriera',
    tags: ['cv', 'lavoro', 'laureati', 'occupazione'],
    featured: true,
  },
  {
    id: 'placement',
    name: 'Placement Universitario',
    description:
      "Ufficio placement dell'ateneo per supporto alla ricerca del lavoro, orientamento e tirocini.",
    url: 'https://www3.unimol.it/terza-missione/placement',
    category: 'carriera',
    tags: ['tirocinio', 'orientamento', 'placement'],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description:
      'Rete professionale per costruire il profilo lavorativo, cercare stage e opportunità di lavoro.',
    url: 'https://www.linkedin.com',
    category: 'carriera',
    tags: ['networking', 'lavoro', 'stage', 'professionale'],
  },
  {
    id: 'jobteaser',
    name: 'Jobteaser',
    description:
      'Piattaforma per studenti e neolaureati con offerte di stage, tirocini e primo impiego.',
    url: 'https://www.jobteaser.com',
    category: 'carriera',
    tags: ['stage', 'tirocinio', 'lavoro', 'offerte'],
  },

  // Collabs
  {
    id: 'overleaf',
    name: 'Overleaf - LaTeX',
    description:
      'Editor LaTeX collaborativo online per tesi, articoli scientifici e documenti accademici.',
    url: 'https://www.overleaf.com',
    category: 'collaborazione',
    tags: ['latex', 'tesi', 'documenti', 'accademico'],
    featured: false,
  },
  {
    id: 'drive',
    name: 'Google Drive',
    description: "Archiviazione e condivisione documenti su cloud con l'account universitario.",
    url: 'https://drive.google.com',
    category: 'collaborazione',
    tags: ['cloud', 'documenti', 'condivisione'],
  },
  {
    id: 'onedrive',
    name: 'OneDrive - Microsoft',
    description:
      'Archiviazione cloud Microsoft con integrazione Office 365 e accesso da qualsiasi dispositivo.',
    url: 'https://onedrive.live.com',
    category: 'collaborazione',
    tags: ['cloud', 'office', 'documenti'],
  },
  {
    id: 'notion',
    name: 'Notion',
    description:
      'Strumento per prendere appunti, organizzare progetti di gruppo e gestire la propria produttività.',
    url: 'https://www.notion.so',
    category: 'collaborazione',
    tags: ['appunti', 'produttività', 'progetti'],
  },

  // Health & Support
  {
    id: 'cus',
    name: 'CUS - Centro Universitario Sportivo',
    description:
      "Attività sportive, corsi e strutture del Centro Universitario Sportivo dell'ateneo.",
    url: 'https://cusmolise.unimol.it',
    category: 'benessere',
    tags: ['sport', 'palestra', 'corsi', 'attività'],
  },
  {
    id: 'counseling',
    name: 'Counseling Psicologico',
    description:
      'Servizio di supporto psicologico gratuito per studenti. Prenotazione colloqui con psicologi universitari.',
    url: 'https://www3.unimol.it/servizi/dettaglio/19',
    category: 'benessere',
    tags: ['supporto', 'psicologia', 'benessere', 'salute'],
  },
  {
    id: 'disabilita',
    name: 'Ufficio Disabilità & DSA',
    description:
      "Servizi e supporto per studenti con disabilità, disturbi specifici dell'apprendimento e BES.",
    url: 'https://disabiliabili.unimol.it/login',
    category: 'benessere',
    tags: ['disabilità', 'dsa', 'supporto', 'inclusione'],
  },

  // International
  {
    id: 'erasmus',
    name: 'Erasmus+ - Portale Ateneo',
    description:
      "Informazioni, bandi e candidature per programmi Erasmus+ di studio e tirocinio all'estero.",
    url: 'https://www.unimol.it/english/erasmus-incoming/',
    category: 'internazionale',
    tags: ['erasmus', 'estero', 'mobilità', 'borse'],
    featured: true,
  },
  {
    id: 'erasmus-ewp',
    name: 'Erasmus Without Paper',
    description:
      'Portale ufficiale EU per la gestione digitale dei documenti Erasmus (OLA, LA, nominative).',
    url: 'https://ewp-dashboard.eu',
    category: 'internazionale',
    tags: ['erasmus', 'documenti', 'accordi', 'ola'],
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    description:
      "App per l'apprendimento delle lingue straniere. Utile per prepararsi alla mobilità internazionale.",
    url: 'https://www.duolingo.com',
    category: 'internazionale',
    tags: ['lingue', 'apprendimento', 'internazionale'],
  },
];
