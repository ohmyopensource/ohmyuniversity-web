import { Injectable, inject } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import { Exam } from '@shared/types/dashboard/dashboard-career.types';
import { GradesResponse } from 'src/app/core/domain/models/career/grades.model';
import { CareerInfoResponse } from 'src/app/core/domain/models/career/career-info.model';

const MAX_GRADE = 30;
const GRADUATION_BASE_MAX = 110;
const AVERAGE_DECIMALS = 2;
const DEFAULT_TOTAL_CFU = 180;

/** Ministerial course type → total credits required for the degree. Same mapping as CareerPage. */
const CFU_BY_TIPO_CORSO: Record<string, number> = {
  L: 180,
  LM: 120,
  LM5: 300,
  LM6: 360,
  LS: 120,
  L2: 180,
  CU: 300,
};

/** Aggregated career stats consumed by the dashboard career widgets. */
export interface CareerWidgetStats {
  arithmeticAvg: number;
  weightedAvg: number;
  graduationBase: number;
  honors: number;
  obtainedCfu: number;
  totalCfu: number;
  cfuProgress: number;
  currentYearExams: Exam[];
}

/**
 * Computes the same career statistics shown on the Carriera page, so the
 * dashboard widgets stay in sync without duplicating the calculation logic
 * (widgets never show simulated grades, only real API data).
 * The underlying API calls are shared via shareReplay: placing multiple
 * career widgets on the dashboard triggers only one set of requests.
 */
@Injectable({ providedIn: 'root' })
export class DashboardCareerStatsService {
  private readonly careerFacade = inject(CareerFacade);

  readonly stats$: Observable<CareerWidgetStats> = combineLatest([
    this.careerFacade.getTranscript(),
    this.careerFacade.getGrades(),
    this.careerFacade.getCareerInfo(),
  ]).pipe(
    map(([exams, grades, careerInfo]) => this.computeStats(exams, grades, careerInfo)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private computeStats(
    exams: Exam[],
    grades: GradesResponse | null,
    careerInfo: CareerInfoResponse | null,
  ): CareerWidgetStats {
    const arithmeticAvg = grades?.mediaAritmetica
      ? this.roundAverage(grades.mediaAritmetica)
      : this.computeArithmeticAverage(exams);

    const weightedAvg = grades?.mediaPesata
      ? this.roundAverage(grades.mediaPesata)
      : this.computeWeightedAverage(exams);

    const graduationBase = Math.round((weightedAvg / MAX_GRADE) * GRADUATION_BASE_MAX);

    const obtainedCfu =
      grades?.cfu ?? exams.filter(e => e.status === 'PASSED').reduce((s, e) => s + e.cfu, 0);

    const totalCfu = this.computeTotalCfu(exams, grades, careerInfo);
    const cfuProgress = Math.min(100, Math.round((obtainedCfu / totalCfu) * 100));

    const honors = exams.filter(
      e => e.status === 'PASSED' && e.grade?.toUpperCase() === '30L',
    ).length;

    const currentYearExams = this.getCurrentYearExams(exams);

    return {
      arithmeticAvg,
      weightedAvg,
      graduationBase,
      honors,
      obtainedCfu,
      totalCfu,
      cfuProgress,
      currentYearExams,
    };
  }

  /** Mandatory exams of the most advanced academic year the student has reached ("current semester"). */
  private getCurrentYearExams(exams: Exam[]): Exam[] {
    const mandatoryYears = exams.filter(e => e.category === 'MANDATORY').map(e => e.academicYear);
    if (mandatoryYears.length === 0) return [];
    const currentYear = Math.max(...mandatoryYears);
    return exams.filter(e => e.category === 'MANDATORY' && e.academicYear === currentYear);
  }

  private computeTotalCfu(
    exams: Exam[],
    grades: GradesResponse | null,
    careerInfo: CareerInfoResponse | null,
  ): number {
    const byTipoCorso = careerInfo?.tipoCorsoCod
      ? CFU_BY_TIPO_CORSO[careerInfo.tipoCorsoCod]
      : null;
    if (byTipoCorso) return byTipoCorso;
    if (grades?.cfuTotali && grades.cfuTotali > 0) return grades.cfuTotali;
    const sum = exams.reduce((s, e) => s + (e.cfu ?? 0), 0);
    return sum > 0 ? sum : DEFAULT_TOTAL_CFU;
  }

  private computeWeightedAverage(exams: Exam[]): number {
    const grades = this.gradesForComputation(exams);
    if (grades.length === 0) return 0;
    const weightedSum = grades.reduce((acc, g) => acc + g.value * g.cfu, 0);
    const totalWeight = grades.reduce((acc, g) => acc + g.cfu, 0);
    return this.roundAverage(weightedSum / totalWeight);
  }

  private computeArithmeticAverage(exams: Exam[]): number {
    const grades = this.gradesForComputation(exams);
    if (grades.length === 0) return 0;
    return this.roundAverage(grades.reduce((acc, g) => acc + g.value, 0) / grades.length);
  }

  private gradesForComputation(exams: Exam[]): { value: number; cfu: number }[] {
    return exams
      .filter(e => e.status === 'PASSED')
      .map(e => ({ value: this.parseGrade(e.grade) ?? 0, cfu: e.cfu }))
      .filter(g => g.value > 0);
  }

  private parseGrade(grade: string): number | null {
    if (!grade) return null;
    if (grade.toUpperCase() === '30L') return 30;
    const parsed = Number.parseInt(grade, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }

  private roundAverage(value: number): number {
    const factor = Math.pow(10, AVERAGE_DECIMALS);
    return Math.round(value * factor) / factor;
  }
}
