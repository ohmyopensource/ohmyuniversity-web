export interface TranscriptRow {
  adsceId: number;
  adCod: string;
  adDes: string;
  annoCorso: number;
  stato: string;
  statoDes: string;
  peso: number;
  tipoInsCod: string;
  tipoInsDes: string;
  voto: number | null;
  lode: boolean;
  dataEsame: string | null;
  superata: boolean;
  numAppelliPrenotabili: number;
  modValCod?: string;
  adId?: number;
  cdsId?: number;
  aaOffId?: number;
}

export interface TranscriptResponse {
  righe: TranscriptRow[];
}
