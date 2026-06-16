import { Scholarship, FormModule, Bando, Fee } from '@shared/types/dashboard/secretariat.types';

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'b1',
    name: 'Borsa di Studio DSU Molise 2024/2025',
    provider: 'DSU Molise',
    amount: 'Fino a €5.500 + alloggio',
    deadline: '30 settembre 2025',
    status: 'open',
    description:
      'Borsa per il diritto allo studio destinata agli studenti con ISEE inferiore a €24.335. Comprende contributo monetario e accesso alla mensa universitaria.',
    requirements: [
      'ISEE ≤ €24.335',
      'Iscritto a corso di laurea triennale o magistrale',
      'Requisiti di merito previsti dal bando',
    ],
    url: 'https://www.dsumolise.it/borse',
  },
  {
    id: 'b2',
    name: 'Borsa Erasmus+ Studio 2024/2025',
    provider: 'Università del Molise',
    amount: '€350–€500 / mese',
    deadline: '15 marzo 2025',
    status: 'closed',
    description:
      "Contributo mensile per studenti selezionati per la mobilità Erasmus+ in Europa. L'importo varia in base al paese di destinazione.",
    requirements: [
      'Media voti ≥ 24/30',
      'Minimo 40 CFU acquisiti',
      'Conoscenza della lingua del paese di destinazione',
    ],
    url: 'https://www.unimol.it/erasmus/borse',
  },
  {
    id: 'b3',
    name: 'Premio di Laurea "Eccellenza Molise"',
    provider: 'Università del Molise',
    amount: '€2.000',
    deadline: '31 luglio 2025',
    status: 'open',
    description:
      "Premio una tantum per i migliori laureati dell'anno accademico in corso con votazione di 110/110 con lode.",
    requirements: [
      'Laurea con 110/110 con lode',
      'Laureato entro i termini del corso',
      'Residenza in Molise',
    ],
    url: 'https://www.unimol.it/premi-laurea',
  },
  {
    id: 'b4',
    name: "Borsa Tesi all'Estero",
    provider: 'Università del Molise',
    amount: '€1.500 una tantum',
    deadline: '28 febbraio 2025',
    status: 'closed',
    description:
      'Contributo per studenti che svolgono parte della tesi di laurea magistrale presso università o centri di ricerca stranieri.',
    requirements: [
      'Iscritto al 2° anno LM',
      'Accordo con istituzione estera',
      'Piano di lavoro approvato',
    ],
    url: 'https://www.unimol.it/borsa-tesi-estero',
  },
  {
    id: 'b5',
    name: 'Contributo Studenti con Disabilità',
    provider: 'DSU Molise',
    amount: 'Variabile in base al grado di disabilità',
    deadline: '31 ottobre 2025',
    status: 'open',
    description:
      'Supporto economico e servizi aggiuntivi per studenti con invalidità certificata. Include ausili, tutoraggio e abbattimento tasse.',
    requirements: ['Invalidità certificata ≥ 66%', 'Iscrizione a corso di laurea attivo'],
    url: 'https://www.dsumolise.it/disabilita',
  },
  {
    id: 'b6',
    name: 'Borsa "150 ore" — Collaborazione Studentesca',
    provider: 'Università del Molise',
    amount: '€9/ora · max €1.350',
    deadline: '20 ottobre 2025',
    status: 'closing',
    description:
      "Collaborazione part-time con l'ateneo per 150 ore presso uffici, biblioteche e laboratori. Aperta a studenti con ISEE ≤ €30.000.",
    requirements: ['ISEE ≤ €30.000', 'Minimo 20 CFU acquisiti', 'Non ripetente dello stesso anno'],
    url: 'https://www.unimol.it/150ore',
  },
];

export const MOCK_FORM_MODULES: FormModule[] = [
  {
    id: 'm1',
    name: 'Domanda di immatricolazione',
    description:
      "Modulo per l'immatricolazione a corsi di laurea triennale, magistrale e magistrale a ciclo unico.",
    category: 'Iscrizioni',
    url: 'https://esse3.unimol.it/immatricolazione',
    updatedAt: 'Settembre 2024',
  },
  {
    id: 'm2',
    name: 'Piano di studi individuale',
    description:
      'Modulo per la presentazione del piano di studi individuale fuori percorso standard.',
    category: 'Carriera',
    url: 'https://esse3.unimol.it/piano-studi',
    updatedAt: 'Ottobre 2024',
  },
  {
    id: 'm3',
    name: 'Richiesta certificato di laurea',
    description:
      'Modulo per richiedere certificati accademici con e senza timbro e firma del rettore.',
    category: 'Certificati',
    url: 'https://esse3.unimol.it/certificati',
    updatedAt: 'Gennaio 2025',
  },
  {
    id: 'm4',
    name: 'Riconoscimento crediti (trasferimento)',
    description:
      'Modulo da compilare in caso di trasferimento da altro ateneo o cambio corso per il riconoscimento dei CFU acquisiti.',
    category: 'Trasferimenti',
    url: 'https://www.unimol.it/modulistica/riconoscimento-crediti',
    updatedAt: 'Luglio 2024',
  },
  {
    id: 'm5',
    name: 'Domanda di sospensione carriera',
    description:
      'Modulo per richiedere la sospensione temporanea della carriera universitaria per motivi documentati.',
    category: 'Carriera',
    url: 'https://www.unimol.it/modulistica/sospensione',
    updatedAt: 'Marzo 2024',
  },
  {
    id: 'm6',
    name: 'Richiesta esonero tasse',
    description:
      'Modulo per la richiesta di esonero parziale o totale dalle tasse universitarie per condizioni economiche o di merito.',
    category: 'Tasse',
    url: 'https://www.unimol.it/modulistica/esonero-tasse',
    updatedAt: 'Giugno 2024',
  },
  {
    id: 'm7',
    name: 'Domanda di tirocinio curriculare',
    description:
      "Modulo per l'attivazione di tirocini curriculari presso aziende convenzionate con l'ateneo.",
    category: 'Tirocini',
    url: 'https://placement.unimol.it/tirocini',
    updatedAt: 'Settembre 2024',
  },
  {
    id: 'm8',
    name: 'Autocertificazione ISEE',
    description:
      'Modulo di autocertificazione del reddito familiare per la domanda di borsa di studio o esonero tasse.',
    category: 'Economico',
    url: 'https://www.unimol.it/modulistica/isee',
    updatedAt: 'Febbraio 2025',
  },
  {
    id: 'm9',
    name: 'Domanda di laurea',
    description:
      'Procedura online per la presentazione della domanda di laurea e caricamento della tesi.',
    category: 'Laurea',
    url: 'https://esse3.unimol.it/domanda-laurea',
    updatedAt: 'Novembre 2024',
  },
];

export const MOCK_BANDI: Bando[] = [
  {
    id: 'ba1',
    title: 'Bando Tutor Didattici 2024/2025',
    description:
      'Selezione di studenti senior per attività di tutoraggio a supporto degli studenti del primo anno.',
    category: 'Selezione studenti',
    deadline: '10 novembre 2025',
    status: 'open',
    amount: '€600 una tantum',
    url: 'https://www.unimol.it/bandi/tutor-didattici',
    publishedAt: '1 ottobre 2025',
  },
  {
    id: 'ba2',
    title: 'Concorso Fotografico "Università in scatto"',
    description:
      "Concorso aperto a tutti gli studenti dell'ateneo per la valorizzazione del patrimonio universitario attraverso la fotografia.",
    category: 'Concorsi culturali',
    deadline: '28 febbraio 2025',
    status: 'closed',
    amount: '1° premio €500',
    url: 'https://www.unimol.it/bandi/concorso-foto',
    publishedAt: '15 gennaio 2025',
  },
  {
    id: 'ba3',
    title: 'Bando Rappresentanti degli Studenti',
    description:
      "Elezioni per i rappresentanti degli studenti negli organi collegiali dell'ateneo per il biennio 2025/2027.",
    category: 'Elezioni',
    deadline: '20 novembre 2025',
    status: 'open',
    url: 'https://www.unimol.it/bandi/rappresentanti',
    publishedAt: '5 ottobre 2025',
  },
  {
    id: 'ba4',
    title: 'Selezione Studentessa/Studente Erasmus Ambassador',
    description:
      'Ricerca di studenti con esperienza Erasmus per promuovere la mobilità internazionale nelle scuole superiori del Molise.',
    category: 'Internazionale',
    deadline: '5 novembre 2025',
    status: 'closing',
    url: 'https://www.unimol.it/bandi/erasmus-ambassador',
    publishedAt: '20 settembre 2025',
  },
  {
    id: 'ba5',
    title: 'Premio Tesi di Laurea in Sostenibilità',
    description:
      'Premio per le migliori tesi di laurea magistrale su temi di sostenibilità ambientale, sociale ed economica.',
    category: 'Premi',
    deadline: '31 gennaio 2025',
    status: 'closed',
    amount: '€1.000',
    url: 'https://www.unimol.it/bandi/premio-sostenibilita',
    publishedAt: '1 dicembre 2024',
  },
  {
    id: 'ba6',
    title: 'Bando Collaboratori Biblioteca 2025',
    description:
      "Selezione studenti per collaborazione part-time presso la Biblioteca di Ateneo per attività di catalogazione e supporto all'utenza.",
    category: 'Selezione studenti',
    deadline: '15 dicembre 2025',
    status: 'open',
    amount: '€9/ora · max 80 ore',
    url: 'https://www.unimol.it/bandi/biblioteca',
    publishedAt: '10 novembre 2025',
  },
];

export const MOCK_FEES: Fee[] = [
  {
    id: 'f1',
    name: 'Prima rata — A.A. 2024/2025',
    amount: 450,
    dueDate: '31 ottobre 2024',
    paidAt: '15 ottobre 2024',
    status: 'paid',
    receipt: 'https://esse3.unimol.it/ricevuta/f1',
  },
  {
    id: 'f2',
    name: 'Seconda rata — A.A. 2024/2025',
    amount: 380,
    dueDate: '28 febbraio 2025',
    paidAt: '20 febbraio 2025',
    status: 'paid',
    receipt: 'https://esse3.unimol.it/ricevuta/f2',
  },
  {
    id: 'f3',
    name: 'Terza rata — A.A. 2024/2025',
    amount: 380,
    dueDate: '30 aprile 2025',
    status: 'overdue',
    payUrl: 'https://esse3.unimol.it/pagamenti',
  },
  {
    id: 'f4',
    name: 'Contributo servizi — A.A. 2024/2025',
    amount: 80,
    dueDate: '31 ottobre 2024',
    paidAt: '15 ottobre 2024',
    status: 'paid',
    receipt: 'https://esse3.unimol.it/ricevuta/f4',
  },
  {
    id: 'f5',
    name: 'Prima rata — A.A. 2025/2026',
    amount: 450,
    dueDate: '31 ottobre 2025',
    status: 'pending',
    payUrl: 'https://esse3.unimol.it/pagamenti',
  },
];
