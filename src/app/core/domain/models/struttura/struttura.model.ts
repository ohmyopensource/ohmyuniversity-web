/** A degree program type offered under a faculty/department. */
export interface TipoCorsoStruttura {
  cdsId: number;
  facId: number;
  tipoCorsoCod: string;
  tipoCorsoDes: string;
}

/** A physical location (sede), either standalone or nested inside a Struttura. */
export interface Sede {
  sedeId: number;
  facId: number | null;
  defAmmFlg: number | null;
  ateneoId: number | null;
  sedeDes: string;
  sedeDesEng: string | null;
  cap: string | null;
  via: string | null;
  direttore: string | null;
  citta: string | null;
  cistra: string | null;
  istatCod: string | null;
  tel: string | null;
  fax: string | null;
  email: string | null;
  urlSitoWeb: string | null;
}

/** A faculty/department (struttura didattica), with nested locations and degree types. */
export interface Struttura {
  facId: number;
  istatCod: string | null;
  facCod: string;
  facDes: string;
  facDesEng: string | null;
  ateneoId: number | null;
  citta: string | null;
  via: string | null;
  prov: string | null;
  cap: string | null;
  codFis: string | null;
  aaAttId: number | null;
  aaDisId: number | null;
  urlSitoWeb: string | null;
  webViewFlg: number | null;
  tel: string | null;
  fax: string | null;
  email: string | null;
  codStatMiur: string | null;
  csaCod: string | null;
  sdrTip: string | null;
  areaDiscCod: string | null;
  areaDiscDesEng: string | null;
  sedi: Sede[];
  tipiCorso: TipoCorsoStruttura[];
}
