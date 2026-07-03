import { Exam } from '@shared/types/dashboard/dashboard-career.types';
import { TranscriptRow } from 'src/app/core/domain/models/career/transcript.model';
import { StudyPlanRow } from 'src/app/core/domain/models/career/study-plan.model';

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
