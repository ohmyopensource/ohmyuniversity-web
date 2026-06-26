import { mergeToExams } from './carriera.mapper';
import { StudyPlanRow } from 'src/app/core/domain/models/career/study-plan.model';
import { TranscriptRow } from 'src/app/core/domain/models/career/transcript.model';

// ── Helpers ──────────────────────────────────────────────────────────────────

const makePlanRow = (overrides: Partial<StudyPlanRow> = {}): StudyPlanRow => ({
  adCod: 'MAT001',
  adDes: 'Matematica',
  cfu: 6,
  annoCorso: 1,
  tipoInsCod: 'O',
  tipoInsDes: 'Obbligatorio',
  obbligatorio: true,
  stato: 'A',
  statoDes: 'Attivo',
  superata: false,
  adsceId: null as unknown as number,
  ...overrides,
});

const makeTranscriptRow = (overrides: Partial<TranscriptRow> = {}): TranscriptRow => ({
  adCod: 'MAT001',
  adDes: 'Matematica',
  peso: 6,
  annoCorso: 1,
  tipoInsCod: 'O',
  tipoInsDes: 'Obbligatorio',
  stato: 'A',
  statoDes: 'Attivo',
  superata: false,
  voto: null,
  lode: false,
  dataEsame: null,
  numAppelliPrenotabili: 0,
  adsceId: null as unknown as number,
  ...overrides,
});

// ── Output shape ──────────────────────────────────────────────────────────────

describe('mergeToExams - output shape', () => {
  it('should return an empty array when both inputs are empty', () => {
    expect(mergeToExams([], [])).toEqual([]);
  });

  it('should return one exam per study plan row when no transcript rows', () => {
    const rows = [makePlanRow({ adCod: 'A' }), makePlanRow({ adCod: 'B' })];
    expect(mergeToExams(rows, [])).toHaveLength(2);
  });

  it('should map courseCode from adCod', () => {
    const [exam] = mergeToExams([makePlanRow({ adCod: 'FIS001' })], []);
    expect(exam.courseCode).toBe('FIS001');
  });

  it('should map courseName from adDes', () => {
    const [exam] = mergeToExams([makePlanRow({ adDes: 'Fisica' })], []);
    expect(exam.courseName).toBe('Fisica');
  });

  it('should map cfu', () => {
    const [exam] = mergeToExams([makePlanRow({ cfu: 12 })], []);
    expect(exam.cfu).toBe(12);
  });

  it('should map academicYear from annoCorso', () => {
    const [exam] = mergeToExams([makePlanRow({ annoCorso: 3 })], []);
    expect(exam.academicYear).toBe(3);
  });

  it('should set default fixed fields', () => {
    const [exam] = mergeToExams([makePlanRow()], []);
    expect(exam.language).toBe('N/D');
    expect(exam.durationHours).toBe(0);
    expect(exam.prerequisites).toEqual([]);
    expect(exam.cfuBreakdown).toEqual([]);
    expect(exam.simulatedGrade).toBeUndefined();
  });
});

// ── Category mapping ──────────────────────────────────────────────────────────

describe('mergeToExams - category', () => {
  it('should set category to ELECTIVE when tipoInsCod is "S"', () => {
    const [exam] = mergeToExams([makePlanRow({ tipoInsCod: 'S' })], []);
    expect(exam.category).toBe('ELECTIVE');
  });

  it('should set category to MANDATORY when tipoInsCod is "O"', () => {
    const [exam] = mergeToExams([makePlanRow({ tipoInsCod: 'O' })], []);
    expect(exam.category).toBe('MANDATORY');
  });

  it('should set category to MANDATORY when tipoInsCod is any other value', () => {
    const [exam] = mergeToExams([makePlanRow({ tipoInsCod: 'X' })], []);
    expect(exam.category).toBe('MANDATORY');
  });
});

// ── Status mapping ────────────────────────────────────────────────────────────

describe('mergeToExams - status', () => {
  it('should set status to PASSED when plan row superata is true', () => {
    const [exam] = mergeToExams([makePlanRow({ superata: true })], []);
    expect(exam.status).toBe('PASSED');
  });

  it('should set status to TO_TAKE when plan row superata is false', () => {
    const [exam] = mergeToExams([makePlanRow({ superata: false })], []);
    expect(exam.status).toBe('TO_TAKE');
  });

  it('should use transcript superata when plan row superata is undefined', () => {
    const plan = makePlanRow({ superata: null as unknown as boolean });
    const transcript = makeTranscriptRow({ superata: true });
    const [exam] = mergeToExams([plan], [transcript]);
    expect(exam.status).toBe('PASSED');
  });

  it('should default status to TO_TAKE when both superata values are undefined/false', () => {
    const plan = makePlanRow({ superata: null as unknown as boolean });
    const transcript = makeTranscriptRow({ superata: null as unknown as boolean });
    const [exam] = mergeToExams([plan], [transcript]);
    expect(exam.status).toBe('TO_TAKE');
  });

  it('should prefer plan row superata over transcript superata', () => {
    const plan = makePlanRow({ superata: false });
    const transcript = makeTranscriptRow({ superata: true });
    const [exam] = mergeToExams([plan], [transcript]);
    expect(exam.status).toBe('TO_TAKE');
  });
});

// ── Grade mapping ─────────────────────────────────────────────────────────────

describe('mergeToExams - grade', () => {
  it('should set grade to empty string when no transcript row', () => {
    const [exam] = mergeToExams([makePlanRow()], []);
    expect(exam.grade).toBe('');
  });

  it('should set grade to empty string when transcript voto is null', () => {
    const transcript = makeTranscriptRow({ voto: null });
    const [exam] = mergeToExams([makePlanRow()], [transcript]);
    expect(exam.grade).toBe('');
  });

  it('should set grade to string of voto when lode is false', () => {
    const transcript = makeTranscriptRow({ voto: 28, lode: false });
    const [exam] = mergeToExams([makePlanRow()], [transcript]);
    expect(exam.grade).toBe('28');
  });

  it('should set grade to "30L" when lode is true', () => {
    const transcript = makeTranscriptRow({ voto: 30, lode: true });
    const [exam] = mergeToExams([makePlanRow()], [transcript]);
    expect(exam.grade).toBe('30L');
  });
});

// ── Transcript matching - by adsceId ─────────────────────────────────────────

describe('mergeToExams - transcript matching by adsceId', () => {
  it('should match transcript by adsceId when available', () => {
    const plan = makePlanRow({ adCod: 'MAT001', adsceId: 99 });
    const transcript = makeTranscriptRow({ adCod: 'MAT001', adsceId: 99, voto: 27, lode: false });
    const [exam] = mergeToExams([plan], [transcript]);
    expect(exam.grade).toBe('27');
  });

  it('should prefer adsceId match over adCod match', () => {
    const plan = makePlanRow({ adCod: 'MAT001', adsceId: 99 });
    // Same adCod but different adsceId - should not match by adCod because adsceId lookup succeeds
    const transcriptById = makeTranscriptRow({
      adCod: 'OTHER',
      adsceId: 99,
      voto: 30,
      lode: false,
    });
    const transcriptByCode = makeTranscriptRow({
      adCod: 'MAT001',
      adsceId: undefined,
      voto: 18,
      lode: false,
    });
    const [exam] = mergeToExams([plan], [transcriptById, transcriptByCode]);
    expect(exam.grade).toBe('30');
  });

  it('should fall back to adCod match when adsceId is undefined on plan row', () => {
    const plan = makePlanRow({ adCod: 'MAT001' }); // adsceId defaults to null
    const transcript = makeTranscriptRow({ adCod: 'MAT001', adsceId: 99, voto: 25, lode: false });
    const [exam] = mergeToExams([plan], [transcript]);
    expect(exam.grade).toBe('25');
  });
});

// ── Extra transcript rows (not in plan) ───────────────────────────────────────

describe('mergeToExams - extra transcript rows', () => {
  it('should include transcript rows not present in the study plan', () => {
    const plan = [makePlanRow({ adCod: 'MAT001' })];
    const transcript = [
      makeTranscriptRow({ adCod: 'MAT001' }),
      makeTranscriptRow({ adCod: 'FIS001', adDes: 'Fisica', peso: 9 }),
    ];
    const result = mergeToExams(plan, transcript);
    expect(result).toHaveLength(2);
  });

  it('should map extra transcript row fields correctly', () => {
    const extraRow = makeTranscriptRow({
      adCod: 'FIS001',
      adDes: 'Fisica',
      peso: 9,
      annoCorso: 2,
      tipoInsCod: 'S',
      superata: true,
      voto: 29,
      lode: false,
    });
    const result = mergeToExams([], [extraRow]);
    const [exam] = result;
    expect(exam.courseCode).toBe('FIS001');
    expect(exam.courseName).toBe('Fisica');
    expect(exam.cfu).toBe(9);
    expect(exam.academicYear).toBe(2);
    expect(exam.category).toBe('ELECTIVE');
    expect(exam.status).toBe('PASSED');
    expect(exam.grade).toBe('29');
  });

  it('should default cfu to 0 when transcript peso is undefined', () => {
    const extraRow = makeTranscriptRow({ adCod: 'FIS001', peso: null as unknown as number });
    const [exam] = mergeToExams([], [extraRow]);
    expect(exam.cfu).toBe(0);
  });

  it('should not duplicate rows that are in both plan and transcript', () => {
    const plan = [makePlanRow({ adCod: 'MAT001' })];
    const transcript = [makeTranscriptRow({ adCod: 'MAT001' })];
    expect(mergeToExams(plan, transcript)).toHaveLength(1);
  });

  it('should set category to MANDATORY for extra row when tipoInsCod is undefined', () => {
    const extraRow = makeTranscriptRow({ adCod: 'FIS001', tipoInsCod: null as unknown as string });
    const [exam] = mergeToExams([], [extraRow]);
    expect(exam.category).toBe('MANDATORY');
  });
});

// ── Edge cases ────────────────────────────────────────────────────────────────

describe('mergeToExams - edge cases', () => {
  it('should handle multiple plan rows correctly', () => {
    const plan = [
      makePlanRow({ adCod: 'A', adDes: 'Alpha' }),
      makePlanRow({ adCod: 'B', adDes: 'Beta' }),
      makePlanRow({ adCod: 'C', adDes: 'Gamma' }),
    ];
    const result = mergeToExams(plan, []);
    expect(result).toHaveLength(3);
    expect(result.map(e => e.courseCode)).toEqual(['A', 'B', 'C']);
  });

  it('should handle transcript rows with no matching plan rows', () => {
    const transcript = [makeTranscriptRow({ adCod: 'X' }), makeTranscriptRow({ adCod: 'Y' })];
    expect(mergeToExams([], transcript)).toHaveLength(2);
  });

  it('should preserve order: plan rows first, then extra transcript rows', () => {
    const plan = [makePlanRow({ adCod: 'PLAN1' })];
    const transcript = [
      makeTranscriptRow({ adCod: 'PLAN1' }),
      makeTranscriptRow({ adCod: 'EXTRA1' }),
    ];
    const result = mergeToExams(plan, transcript);
    expect(result[0].courseCode).toBe('PLAN1');
    expect(result[1].courseCode).toBe('EXTRA1');
  });
});
