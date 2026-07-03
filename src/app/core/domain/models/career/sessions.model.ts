export interface BookableSession {
  appId: number;
  appelloId: number;
  cdsId: number;
  adId: number;
  adCod: string;
  adDes: string;
  adsceId: number;
  dataInizioApp: string;
  dataInizioIscr: string;
  dataFineIscr: string;
  oraEsa: string;
  stato: string;
  statoDes: string;
  docente: string;
  note: string;
  numIscritti: number;
  tipoIscrCod: string;
  desApp: string;
}

export interface BookableSessionsResponse {
  appelli: BookableSession[];
}

export interface Booking {
  applistaId: number;
  cdsId: number;
  adId: number;
  appId: number;
  adStuCod: string;
  adStuDes: string;
  adsceId: number;
  dataOraTurno: string;
  dataInizioIscr: string;
  dataFineIscr: string;
  aulaDes: string;
  tipoIscrCod: string;
  posizApp?: number;
  numIscritti?: number;
  dataIns?: string;
}

export interface BookingsResponse {
  prenotazioni: Booking[];
}
