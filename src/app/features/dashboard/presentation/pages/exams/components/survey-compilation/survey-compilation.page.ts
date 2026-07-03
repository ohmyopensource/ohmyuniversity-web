import { Component, signal, inject, OnInit, computed, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideArrowLeft,
  LucideArrowRight,
  LucideCheck,
  LucideClipboardList,
  LucideLoaderCircle,
  LucideTriangleAlert,
  LucideShieldCheck,
  LucidePencil,
  LucideInfo,
} from '@lucide/angular';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import {
  SurveyPage,
  SurveyQuestion,
  SurveyAnswerSubmit,
  SurveySummaryPage,
} from 'src/app/core/domain/models/career/survey-compilation.model';

/**
 * Local UI state for a single question's selection.
 * - single: one rispostaId (radio)
 * - multi: set of rispostaId (checkbox)
 * - freeText: rispostaId -> typed text (for TL_RSP_ALF options)
 */
interface QuestionState {
  single: number | null;
  multi: Set<number>;
  freeText: Map<number, string>;
}

@Component({
  selector: 'app-survey-compilation',
  standalone: true,
  imports: [
    FormsModule,
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomButtonComponent,
    CustomCardComponent,
    CustomModalComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './survey-compilation.page.html',
})
export class SurveyCompilationPage implements OnInit {
  private readonly carriera = inject(CareerFacade);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly iconBack = LucideArrowLeft;
  readonly iconNext = LucideArrowRight;
  readonly iconCheck = LucideCheck;
  readonly iconClipboard = LucideClipboardList;
  readonly iconLoader = LucideLoaderCircle;
  readonly iconAlert = LucideTriangleAlert;
  readonly iconShield = LucideShieldCheck;
  readonly iconPencil = LucidePencil;
  readonly iconInfo = LucideInfo;

  // session identifiers (from start)
  private adsceId = 0;
  private questionarioId = 0;
  private questCompId = 0;
  private questConfigId = 0;
  private userCompId = 0;

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly confirming = signal(false);

  readonly surveyTitle = signal<string>('');
  readonly anonimo = signal<boolean>(false);
  readonly currentPage = signal<SurveyPage | null>(null);
  readonly showSummary = signal(false);
  readonly cameFromSummary = signal(false);
  readonly summaryPages = signal<SurveySummaryPage[]>([]);

  // per-question UI state, keyed by domandaId
  private readonly states = new Map<number, QuestionState>();

  readonly isFirstPage = computed(() => {
    const p = this.currentPage();
    return !p || p.prevPageId === null;
  });

  readonly hasPrevPage = computed(() => {
    const p = this.currentPage();
    return !!p && p.prevPageId !== null;
  });

  readonly nextButtonLabel = computed(() => {
    const p = this.currentPage();
    return p && this.isInfoPage(p) ? 'Riepilogo' : 'Successivo';
  });

  isInfoPage(page: SurveyPage): boolean {
    return (page.paragrafi ?? []).every(par => (par.domande ?? []).length === 0);
  }

  @ViewChild('confirmModal') confirmModal!: CustomModalComponent;

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('adsceId');
    this.adsceId = param ? Number(param) : 0;

    if (!this.adsceId) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    const tags = this.route.snapshot.queryParamMap.get('tags') ?? undefined;
    this.carriera.startSurvey(this.adsceId, tags).subscribe({
      next: res => {
        this.questionarioId = res.questionarioId;
        this.questCompId = res.questCompId;
        this.questConfigId = res.questConfigId;
        this.userCompId = res.userCompId;
        this.surveyTitle.set(res.questionarioDes);
        this.anonimo.set(res.anonimoFlg === 1);
        this.initPageState(res.page);
        this.currentPage.set(res.page);
        this.loading.set(false);
      },
      error: err => {
        this.loading.set(false);
        this.error.set(true);
        const msg =
          this.extractError(err) ?? 'Impossibile avviare la compilazione del questionario.';
        this.toast.error(msg, { duration: 6000 });
      },
    });
  }

  // ============ State helpers ============

  private initPageState(page: SurveyPage): void {
    for (const par of page.paragrafi ?? []) {
      for (const q of par.domande ?? []) {
        if (!this.states.has(q.domandaId)) {
          this.states.set(q.domandaId, {
            single: null,
            multi: new Set<number>(),
            freeText: new Map<number, string>(),
          });
        }
      }
    }
  }

  private stateFor(domandaId: number): QuestionState {
    let s = this.states.get(domandaId);
    if (!s) {
      s = { single: null, multi: new Set<number>(), freeText: new Map<number, string>() };
      this.states.set(domandaId, s);
    }
    return s;
  }

  /** A question is multi-choice when it allows more than one selection. */
  isMulti(q: SurveyQuestion): boolean {
    if (q.formatCod === 'TL_DOM_DFM') return true;
    if (q.formatCod === 'TL_DOM_DFS') return false;
    return (q.maxChoices ?? 1) > 1;
  }

  /** A given answer option is free-text (alphanumeric). */
  isFreeTextOption(formatCod: string): boolean {
    return formatCod === 'TL_RSP_ALF';
  }

  isSingleSelected(domandaId: number, rispostaId: number): boolean {
    return this.stateFor(domandaId).single === rispostaId;
  }

  isMultiSelected(domandaId: number, rispostaId: number): boolean {
    return this.stateFor(domandaId).multi.has(rispostaId);
  }

  freeTextValue(domandaId: number, rispostaId: number): string {
    return this.stateFor(domandaId).freeText.get(rispostaId) ?? '';
  }

  // ============ User interactions ============

  onSelectSingle(domandaId: number, rispostaId: number): void {
    this.stateFor(domandaId).single = rispostaId;
  }

  onToggleMulti(domandaId: number, rispostaId: number): void {
    const s = this.stateFor(domandaId);
    if (s.multi.has(rispostaId)) {
      s.multi.delete(rispostaId);
      s.freeText.delete(rispostaId);
    } else {
      s.multi.add(rispostaId);
    }
  }

  onFreeTextChange(domandaId: number, rispostaId: number, value: string): void {
    this.stateFor(domandaId).freeText.set(rispostaId, value);
  }

  // ============ Build answers for current page ============

  private buildAnswers(page: SurveyPage): SurveyAnswerSubmit[] | null {
    const answers: SurveyAnswerSubmit[] = [];

    for (const par of page.paragrafi ?? []) {
      for (const q of par.domande ?? []) {
        const s = this.stateFor(q.domandaId);

        if (this.isMulti(q)) {
          for (const rid of s.multi) {
            const opt = q.risposte.find(r => r.rispostaId === rid);
            const isFree = opt ? this.isFreeTextOption(opt.formatCod) : false;
            answers.push({
              domandaId: q.domandaId,
              rispostaId: rid,
              corpoRisposta: isFree ? (s.freeText.get(rid) ?? '') : '',
            });
          }
          if (q.mandatory && s.multi.size === 0) {
            return null;
          }
        } else {
          const rid = s.single;
          if (rid === null) {
            if (q.mandatory) return null;
            continue;
          }
          const opt = q.risposte.find(r => r.rispostaId === rid);
          const isFree = opt ? this.isFreeTextOption(opt.formatCod) : false;
          answers.push({
            domandaId: q.domandaId,
            rispostaId: rid,
            corpoRisposta: isFree ? (s.freeText.get(rid) ?? '') : '',
          });
        }
      }
    }

    return answers;
  }

  // ============ Navigation ============

  onNext(): void {
    const page = this.currentPage();
    if (!page || this.saving()) return;

    const answers = this.buildAnswers(page);
    if (answers === null) {
      this.toast.warning('Rispondi a tutte le domande obbligatorie prima di continuare.', {
        duration: 4000,
      });
      return;
    }

    this.saving.set(true);
    this.carriera
      .saveSurveyPage({
        questionarioId: this.questionarioId,
        questCompId: this.questCompId,
        pageId: page.paginaId,
        answers,
      })
      .subscribe({
        next: () => {
          this.carriera
            .navigateSurvey({
              adsceId: this.adsceId,
              questionarioId: this.questionarioId,
              questCompId: this.questCompId,
              pageId: page.paginaId,
              userCompId: this.userCompId,
              direction: 'next',
            })
            .subscribe({
              next: nextPage => {
                if (!nextPage || !nextPage.paginaId) {
                  this.cameFromSummary.set(false);
                  this.loadSummary();
                  return;
                }
                this.saving.set(false);
                this.initPageState(nextPage);
                this.currentPage.set(nextPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              },
              error: err => {
                this.saving.set(false);
                this.toast.error(
                  this.extractError(err) ?? 'Errore nel caricamento della pagina successiva.',
                  { duration: 5000 },
                );
              },
            });
        },
        error: err => {
          this.saving.set(false);
          this.toast.error(this.extractError(err) ?? 'Errore nel salvataggio delle risposte.', {
            duration: 5000,
          });
        },
      });
  }

  onPrev(): void {
    const page = this.currentPage();
    if (!page || this.saving() || page.prevPageId === null) return;

    this.saving.set(true);
    this.carriera
      .navigateSurvey({
        adsceId: this.adsceId,
        questionarioId: this.questionarioId,
        questCompId: this.questCompId,
        pageId: page.paginaId,
        userCompId: this.userCompId,
        direction: 'prev',
      })
      .subscribe({
        next: prevPage => {
          this.saving.set(false);
          if (!prevPage) return;
          this.initPageState(prevPage);
          this.currentPage.set(prevPage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: err => {
          this.saving.set(false);
          this.toast.error(
            this.extractError(err) ?? 'Errore nel caricamento della pagina precedente.',
            { duration: 5000 },
          );
        },
      });
  }

  onEditPage(pageId: number): void {
    this.showSummary.set(false);
    this.cameFromSummary.set(true);
    this.loading.set(true);
    this.carriera
      .getSurveyPage({
        adsceId: this.adsceId,
        questionarioId: this.questionarioId,
        questCompId: this.questCompId,
        pageId,
        userCompId: this.userCompId,
      })
      .subscribe({
        next: page => {
          this.loading.set(false);
          if (!page) {
            this.toast.error('Impossibile caricare la pagina da modificare.', { duration: 4000 });
            this.loadSummary();
            return;
          }
          this.initPageState(page);
          this.currentPage.set(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: err => {
          this.loading.set(false);
          this.toast.error(this.extractError(err) ?? 'Errore nel caricamento della pagina.', {
            duration: 5000,
          });
          this.loadSummary();
        },
      });
  }

  onSaveEdit(): void {
    const page = this.currentPage();
    if (!page || this.saving()) return;

    const answers = this.buildAnswers(page);
    if (answers === null) {
      this.toast.warning('Rispondi a tutte le domande obbligatorie prima di continuare.', {
        duration: 4000,
      });
      return;
    }

    this.saving.set(true);
    this.carriera
      .saveSurveyPage({
        questionarioId: this.questionarioId,
        questCompId: this.questCompId,
        pageId: page.paginaId,
        answers,
      })
      .subscribe({
        next: () => {
          this.cameFromSummary.set(false);
          this.currentPage.set(null);
          this.loadSummary();
        },
        error: err => {
          this.saving.set(false);
          this.toast.error(this.extractError(err) ?? 'Errore nel salvataggio delle modifiche.', {
            duration: 5000,
          });
        },
      });
  }

  private loadSummary(): void {
    this.carriera
      .getSurveySummary({
        adsceId: this.adsceId,
        questionarioId: this.questionarioId,
        questCompId: this.questCompId,
        questConfigId: this.questConfigId,
        userCompId: this.userCompId,
      })
      .subscribe({
        next: res => {
          this.saving.set(false);
          this.summaryPages.set(res.pagine ?? []);
          this.showSummary.set(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: err => {
          this.saving.set(false);
          this.toast.error(this.extractError(err) ?? 'Errore nel caricamento del riepilogo.', {
            duration: 5000,
          });
        },
      });
  }

  onBackToSummary(): void {
    if (this.saving()) return;
    this.cameFromSummary.set(false);
    this.currentPage.set(null);
    this.saving.set(true);
    this.loadSummary();
  }

  onConfirm(): void {
    if (this.confirming()) return;
    this.confirming.set(true);

    this.carriera
      .confirmSurvey({
        adsceId: this.adsceId,
        questionarioId: this.questionarioId,
        questCompId: this.questCompId,
        questConfigId: this.questConfigId,
        userCompId: this.userCompId,
      })
      .subscribe({
        next: () => {
          this.confirming.set(false);
          this.confirmModal.close('button');
          this.toast.success('Questionario compilato e confermato con successo.', {
            duration: 5000,
          });
          this.router.navigate(['/dashboard/appelli/questionari', this.adsceId]);
        },
        error: err => {
          this.confirming.set(false);
          this.toast.error(this.extractError(err) ?? 'Errore nella conferma del questionario.', {
            duration: 6000,
          });
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/appelli/questionari', this.adsceId]);
  }

  // ============ Error parsing ============

  private extractError(err: any): string | null {
    const raw = err?.error;
    if (!raw) return null;
    let parsed = raw;
    if (typeof raw === 'string') {
      try {
        parsed = JSON.parse(raw);
      } catch {
        return raw.trim().length > 0 ? raw : null;
      }
    }
    if (parsed && typeof parsed === 'object' && parsed.retErrMsg) {
      return parsed.retErrMsg;
    }
    return null;
  }
}
