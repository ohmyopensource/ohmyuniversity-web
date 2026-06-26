export interface SecretariatGrant {
  title: string;
  amount: string;
  deadline: string;
  description: string;
}

export interface SecretariatForm {
  title: string;
  description: string;
  url: string;
}

export interface SecretariatCall {
  title: string;
  deadline: string;
  description: string;
}

export interface SecretariatTax {
  label: string;
  amount: string;
  deadline: string;
  status: 'paid' | 'pending' | 'overdue';
}

export const MOCK_GRANTS: SecretariatGrant[] = [
  {
    title: 'Borsa di Studio DSU',
    amount: '5.000€',
    deadline: '30 Set 2026',
    description: 'Borsa per merito e reddito',
  },
  {
    title: 'Borsa Erasmus+',
    amount: '800€/mese',
    deadline: '15 Mar 2026',
    description: 'Mobilità internazionale',
  },
  {
    title: 'Borsa Tutorato',
    amount: '1.200€',
    deadline: '01 Nov 2026',
    description: 'Attività di supporto studenti',
  },
];

export const MOCK_FORMS: SecretariatForm[] = [
  {
    title: 'Piano di Studi',
    description: 'Modulo per la presentazione del piano di studi',
    url: '#',
  },
  {
    title: 'Riconoscimento CFU',
    description: 'Richiesta riconoscimento crediti esterni',
    url: '#',
  },
  { title: 'Congedo Temporaneo', description: 'Sospensione temporanea dalla carriera', url: '#' },
  { title: 'Trasferimento', description: 'Richiesta di trasferimento ad altro ateneo', url: '#' },
];

export const MOCK_CALLS: SecretariatCall[] = [
  {
    title: 'Concorso Alloggi DSU',
    deadline: '30 Giu 2026',
    description: 'Assegnazione posti alloggio',
  },
  {
    title: 'Bando Collaborazione 150h',
    deadline: '15 Lug 2026',
    description: 'Attività part-time per studenti',
  },
  {
    title: 'Selezione Tutor Didattico',
    deadline: '01 Ago 2026',
    description: 'Supporto a studenti del primo anno',
  },
];

export const MOCK_TAXES: SecretariatTax[] = [
  { label: 'Prima rata tasse', amount: '450€', deadline: '31 Ott 2026', status: 'pending' },
  { label: 'Seconda rata tasse', amount: '380€', deadline: '28 Feb 2027', status: 'pending' },
  { label: 'Tassa regionale DSU', amount: '140€', deadline: '31 Dic 2026', status: 'paid' },
];

export const LATEST_RESOURCE = {
  type: 'Borsa di Studio',
  title: 'Borsa di Studio DSU',
  description: 'Borsa per merito e reddito - scadenza 30 Set 2026',
  url: '#',
};
