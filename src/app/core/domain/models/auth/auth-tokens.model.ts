export interface ProfiloCarriera {
  universityId: string;
  universityName: string;
  stuId: number;
  matId: number;
  matricola: string;
  corsoNome: string;
  corsoCodice: string;
  cdsId: number;
  tipoCorsoCod: string;
  statusStudente: string;
  statusDescrizione: string;
  annoCorso: number;
  durataAnni: number;
  annoAccademico: number;
  attivo: boolean;
  laureato: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  nome: string;
  cognome: string;
  hasCarriera: boolean;
  careerTracks: ProfiloCarriera[];
}
