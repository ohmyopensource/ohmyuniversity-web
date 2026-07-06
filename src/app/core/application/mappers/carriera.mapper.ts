import { Exam } from '@shared/types/dashboard/dashboard-career.types';
import { TranscriptRow } from 'src/app/core/domain/models/career/transcript.model';
import { StudyPlanRow } from 'src/app/core/domain/models/career/study-plan.model';
import { CoursePlanExam } from '../../domain/models/career/course-plan.model';

function rigaToExam(
  adCod: string,
  adDes: string,
  cfu: number,
  annoCorso: number,
  tipoInsCod: string,
  superata: boolean,
  transcriptRow?: TranscriptRow,
  modValCod?: string,
): Exam {
  return {
    courseCode: adCod,
    courseName: adDes,
    cfu: cfu ?? 0,
    academicYear: annoCorso ?? 0,
    category: tipoInsCod === 'S' ? 'ELECTIVE' : 'MANDATORY',
    status: superata ? 'PASSED' : 'TO_TAKE',
    grade:
      transcriptRow?.voto != null ? (transcriptRow.lode ? '30L' : String(transcriptRow.voto)) : '',
    simulatedGrade: undefined,
    prerequisites: [],
    gradable: modValCod === 'V',
    adId: transcriptRow?.adId,
    cdsId: transcriptRow?.cdsId,
    aaOffId: transcriptRow?.aaOffId,
  };
}

export function mergeToExams(righe: StudyPlanRow[], libretto: TranscriptRow[]): Exam[] {
  const librettoByAdsceId = new Map<number, TranscriptRow>();
  const librettoByAdCod = new Map<string, TranscriptRow>();
  for (const row of libretto) {
    if (row.adsceId != null) librettoByAdsceId.set(row.adsceId, row);
    librettoByAdCod.set(row.adCod, row);
  }

  const pianoAdCods = new Set(righe.map(r => r.adCod));
  const result: Exam[] = [];

  for (const riga of righe) {
    const transcriptRow =
      (riga.adsceId != null ? librettoByAdsceId.get(riga.adsceId) : undefined) ??
      librettoByAdCod.get(riga.adCod);

    const superata = riga.superata ?? transcriptRow?.superata ?? false;

    result.push(
      rigaToExam(
        riga.adCod,
        riga.adDes,
        riga.cfu,
        riga.annoCorso,
        riga.tipoInsCod,
        superata,
        transcriptRow,
        transcriptRow?.modValCod,
      ),
    );
  }

  for (const row of libretto) {
    if (!pianoAdCods.has(row.adCod)) {
      result.push(
        rigaToExam(
          row.adCod,
          row.adDes,
          row.peso ?? 0,
          row.annoCorso,
          row.tipoInsCod ?? '',
          row.superata ?? false,
          row,
          row.modValCod,
        ),
      );
    }
  }

  return result;
}

/**
 * Adds exams from the Cineca Course Catalogue plan that are not yet present
 * in the student's own libretto/study-plan - i.e. future-year activities the
 * student has not reached yet. These are marked with status 'FUTURE' and are
 * never gradable or bookable.
 */
export function mergeWithFuturePlan(baseExams: Exam[], planExams: CoursePlanExam[]): Exam[] {
  const existingCodes = new Set(baseExams.map(e => e.courseCode));
  const futureExams = planExams.filter(p => !existingCodes.has(p.adCod)).map(toFutureExam);
  return [...baseExams, ...futureExams];
}

function toFutureExam(entry: CoursePlanExam): Exam {
  return {
    courseCode: entry.adCod,
    courseName: entry.name,
    cfu: entry.cfu ?? 0,
    academicYear: entry.academicYear ?? 0,
    category: entry.mandatory ? 'MANDATORY' : 'ELECTIVE',
    status: 'FUTURE',
    grade: '',
    simulatedGrade: undefined,
    prerequisites: [],
    gradable: false,
  };
}
