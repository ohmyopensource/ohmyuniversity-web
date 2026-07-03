export interface SurveyExam {
  adCod: string;
  adDes: string;
  adsceId: number;
  annoCorso: number;
  cfu: number;
  statoLink: number;
}

export interface SurveysResponse {
  daCompilare: SurveyExam[];
  compilati: SurveyExam[];
}

export interface SurveyModule {
  adDes: string;
  udDes: string;
  docente: string | null;
  moduloLabel: string | null;
  statoLink: number;
  tags: string;
}

export interface SurveyUnitsResponse {
  adsceId: number;
  questionarioId: number;
  questConfigId: number;
  anonimoFlg: number;
  questionarioDes: string;
  moduli: SurveyModule[];
}
