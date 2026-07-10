import { Exam, BookingExamStatus } from '@shared/types/dashboard/dashboard-exams.types';
import { BookableSession, Booking } from 'src/app/core/domain/models/career/sessions.model';
import { StudyPlanResponse } from 'src/app/core/domain/models/career/study-plan.model';

export interface StudyPlanInfo {
  cfu: number;
  annoCorso: number;
}

/** Extended Exam with a flag telling whether it matched a real entry in the student's study plan. */
export interface MappedExam extends Exam {
  inStudyPlan: boolean;
}

/**
 * Builds the adCod → {cfu, annoCorso} lookup from the study plan rows.
 * Shared by ExamsPage and dashboard exam widgets so the piano/bookable
 * cross-referencing logic (adCod vs adStuCod vs adsceId mismatches, see
 * HANDOFF sessione 6) lives in exactly one place.
 */
export function buildPianoMap(piano: StudyPlanResponse): Map<string, StudyPlanInfo> {
  const pianoMap = new Map<string, StudyPlanInfo>();
  for (const riga of piano.righe ?? []) {
    if (riga.adCod)
      pianoMap.set(riga.adCod, { cfu: riga.cfu ?? 0, annoCorso: riga.annoCorso ?? 0 });
  }
  return pianoMap;
}

/** Bridge map (adsceId → piano info) built from bookings, since the piano itself has adsceId: null. */
export function buildInfoByAdsce(
  prenotazioni: Booking[],
  pianoMap: Map<string, StudyPlanInfo>,
): Map<number, StudyPlanInfo> {
  const infoByAdsce = new Map<number, StudyPlanInfo>();
  for (const p of prenotazioni) {
    const info = pianoMap.get(p.adStuCod);
    if (info) infoByAdsce.set(p.adsceId, info);
  }
  return infoByAdsce;
}

export function bookingKey(adsceId: number, appId: number): string {
  return `${adsceId}:${appId}`;
}

function parseData(s: string | null): Date | null {
  if (!s) return null;
  const parts = s.split(' ')[0].split('/');
  if (parts.length !== 3) return null;
  return new Date(+parts[2], +parts[1] - 1, +parts[0]);
}

export function formatData(s: string | null): string {
  if (!s) return 'N/D';
  const parts = s.split(' ')[0].split('/');
  if (parts.length !== 3) return s;
  return `${parts[0]}/${parts[1]}/${parts[2]}`;
}

export function mapAppello(
  a: BookableSession,
  pianoMap: Map<string, StudyPlanInfo>,
  prenotazioniMap: Map<string, Booking>,
  prenotatiKeys: Set<string>,
  infoByAdsce: Map<number, StudyPlanInfo>,
): MappedExam {
  const oggi = new Date();
  const dataFineIscr = parseData(a.dataFineIscr);
  const dataInizioIscr = parseData(a.dataInizioIscr);
  const isPrenotato = prenotatiKeys.has(bookingKey(a.adsceId, a.appId));
  const prenotazione = prenotazioniMap.get(bookingKey(a.adsceId, a.appId));

  const pianoInfoMatch = infoByAdsce.get(a.adsceId) ?? pianoMap.get(a.adCod);
  const pianoInfo = pianoInfoMatch ?? { cfu: 0, annoCorso: 0 };

  let ora = 'N/D';
  if (prenotazione?.dataOraTurno?.includes(' ')) {
    ora = prenotazione.dataOraTurno.split(' ')[1].substring(0, 5);
  } else if (a.oraEsa?.includes(' ')) {
    ora = a.oraEsa.split(' ')[1].substring(0, 5);
  }

  let status: BookingExamStatus;
  if (isPrenotato) {
    status = 'booked';
  } else if (a.stato === 'S') {
    status = 'closed';
  } else if (a.stato === 'P' || a.stato === 'I') {
    if (dataFineIscr && dataFineIscr < oggi) {
      status = 'closed';
    } else if (dataInizioIscr && dataInizioIscr > oggi) {
      status = 'upcoming';
    } else if (dataFineIscr) {
      const diff = dataFineIscr.getTime() - oggi.getTime();
      status = diff / (1000 * 60 * 60 * 24) <= 3 ? 'closing' : 'open';
    } else {
      status = 'open';
    }
  } else {
    status = 'closed';
  }

  return {
    id: String(a.appelloId ?? a.appId),
    courseName: a.adDes ?? a.desApp ?? 'N/D',
    courseAcronym: a.adCod ?? 'N/D',
    cfu: pianoInfo.cfu,
    year: pianoInfo.annoCorso,
    date: formatData(prenotazione?.dataOraTurno ?? a.dataInizioApp),
    time: ora,
    location: prenotazione?.aulaDes ?? 'N/D',
    building: 'N/D',
    professor: a.docente ?? 'N/D',
    enrollDeadline: formatData(a.dataFineIscr),
    spotsLeft: prenotazione?.numIscritti ?? a.numIscritti ?? 0,
    spotsTotal: 0,
    position: prenotazione?.posizApp,
    bookingDate: prenotazione?.dataIns ? formatData(prenotazione.dataIns) : undefined,
    status,
    dataInizioIscr: formatData(a.dataInizioIscr),
    cdsId: a.cdsId,
    adId: a.adId,
    appId: a.appId,
    adsceId: a.adsceId,
    inStudyPlan: !!pianoInfoMatch,
  } as MappedExam;
}

export function mapIscrizione(
  p: Booking,
  pianoMap: Map<string, StudyPlanInfo>,
  docenteByAdsce: Map<number, string>,
): MappedExam {
  const pianoInfoMatch = pianoMap.get(p.adStuCod);
  const pianoInfo = pianoInfoMatch ?? { cfu: 0, annoCorso: 0 };
  const ora = p.dataOraTurno?.includes(' ') ? p.dataOraTurno.split(' ')[1].substring(0, 5) : 'N/D';

  return {
    id: String(p.applistaId),
    courseName: p.adStuDes ?? 'N/D',
    courseAcronym: p.adStuCod ?? 'N/D',
    cfu: pianoInfo.cfu,
    year: pianoInfo.annoCorso,
    date: formatData(p.dataOraTurno),
    time: ora,
    location: p.aulaDes ?? 'N/D',
    building: 'N/D',
    professor: docenteByAdsce.get(p.adsceId) ?? 'N/D',
    enrollDeadline: formatData(p.dataFineIscr),
    spotsLeft: p.numIscritti ?? 0,
    spotsTotal: 0,
    position: p.posizApp,
    bookingDate: p.dataIns ? formatData(p.dataIns) : undefined,
    status: 'booked' as BookingExamStatus,
    dataInizioIscr: formatData(p.dataInizioIscr),
    cdsId: p.cdsId,
    adId: p.adId,
    appId: p.appId,
    adsceId: p.adsceId,
    inStudyPlan: !!pianoInfoMatch,
  } as MappedExam;
}
