export interface SurveyAnswerOption {
  rispostaId: number;
  des: string;
  formatCod: string;
}

export interface SurveyQuestion {
  domandaId: number;
  des: string;
  mandatory: boolean;
  maxChoices: number | null;
  formatCod: string;
  risposte: SurveyAnswerOption[];
}

export interface SurveyParagraph {
  paragrafoId: number;
  des: string | null;
  note: string | null;
  domande: SurveyQuestion[];
}

export interface SurveyPage {
  paginaId: number;
  prevPageId: number | null;
  nextPageId: number | null;
  des: string | null;
  paragrafi: SurveyParagraph[];
}

export interface SurveyStartResponse {
  questCompId: number;
  userCompId: number;
  questionarioId: number;
  questConfigId: number;
  anonimoFlg: number;
  questionarioDes: string;
  page: SurveyPage;
}

export interface SurveyAnswerSubmit {
  domandaId: number;
  rispostaId: number;
  corpoRisposta: string;
}

export interface SurveySaveRequest {
  questionarioId: number;
  questCompId: number;
  pageId: number;
  answers: SurveyAnswerSubmit[];
}

export interface SurveyNavigateRequest {
  adsceId: number;
  questionarioId: number;
  questCompId: number;
  pageId: number;
  userCompId: number;
  direction: 'next' | 'prev';
}

export interface SurveyConfirmRequest {
  adsceId: number;
  questionarioId: number;
  questCompId: number;
  questConfigId: number;
  userCompId: number;
}

export interface SurveySummaryItem {
  paragrafoDes: string | null;
  domandaDes: string;
  rispostaDes: string;
  testoLibero: string | null;
}

export interface SurveySummaryPage {
  paginaId: number;
  items: SurveySummaryItem[];
}

export interface SurveySummaryResponse {
  questionarioDes: string;
  pagine: SurveySummaryPage[];
}

export interface SurveySummaryRequest {
  adsceId: number;
  questionarioId: number;
  questCompId: number;
  questConfigId: number;
  userCompId: number;
}

export interface SurveyGetPageRequest {
  adsceId: number;
  questionarioId: number;
  questCompId: number;
  pageId: number;
  userCompId: number;
}
