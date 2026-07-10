import { Component, signal, inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  LucideDynamicIcon,
  LucideCalendarCheck,
  LucideLock,
  LucideTriangleAlert,
  LucideCalendarDays,
  LucideClipboardList,
  LucideSparkles,
} from '@lucide/angular';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { Exam, BookingExamStatus } from '@shared/types/dashboard/dashboard-exams.types';
import { BookableSession, Booking } from 'src/app/core/domain/models/career/sessions.model';
import { ExamListComponent } from '../components/exam-list/exam-list.component';
import { QuestionnaireListComponent } from '../components/questionnaire-list/questionnaire-list.component';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import {
  buildPianoMap,
  buildInfoByAdsce,
  bookingKey,
  mapAppello,
  mapIscrizione,
} from '@shared/utils/exams-mapping.utils';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomTabsComponent,
    ExamListComponent,
    QuestionnaireListComponent,
    CustomModalComponent,
    CustomButtonComponent,
    CustomInputComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './exams.page.html',
})
export class ExamsPage implements OnInit {
  private readonly toast = inject(ToastService);
  private readonly carriera = inject(CareerFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly iconCalendarCheck = LucideCalendarCheck;
  readonly iconLock = LucideLock;
  readonly iconAlert = LucideTriangleAlert;

  readonly suggestedLoading = signal(true);
  readonly suggestedError = signal(false);
  readonly suggestedExams = signal<Exam[]>([]);
  readonly activeTab = signal<string>('exams');
  readonly examsLoading = signal(true);
  readonly examsError = signal(false);
  readonly exams = signal<Exam[]>([]);
  readonly userEmail = signal<string>('');
  readonly selectedExam = signal<Exam | null>(null);
  readonly bookingPassword = signal<string>('');
  readonly bookingLoading = signal(false);
  readonly examToCancel = signal<Exam | null>(null);
  readonly cancelPassword = signal('');
  readonly cancelling = signal(false);

  @ViewChild('confirmModal') confirmModal!: CustomModalComponent;
  @ViewChild('passwordModal') passwordModal!: CustomModalComponent;
  @ViewChild('cancelModal') cancelModal!: CustomModalComponent;

  readonly tabs: TabItem[] = [
    { id: 'exams', label: 'Appelli', icon: LucideCalendarDays },
    { id: 'suggested', label: 'Suggeriti', icon: LucideSparkles },
    { id: 'questionnaires', label: 'Questionari', icon: LucideClipboardList },
  ];

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (tab) {
      this.activeTab.set(tab);
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { tab: this.activeTab() },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }

    this.reload();
  }

  private reload(): void {
    this.examsLoading.set(true);
    this.suggestedLoading.set(true);
    this.examsError.set(false);
    this.suggestedError.set(false);

    forkJoin({
      appelli: this.carriera.getBookableSessions(),
      prenotazioni: this.carriera.getBookings(),
      piano: this.carriera.getStudyPlan(),
      suggeriti: this.carriera.getRecommendations(),
      info: this.carriera.getCareerInfo(),
    }).subscribe({
      next: ({ appelli, prenotazioni, piano, suggeriti, info }) => {
        this.userEmail.set(info.emailAte ?? info.email ?? 'N/D');
        const pianoMap = buildPianoMap(piano);
        const infoByAdsce = buildInfoByAdsce(prenotazioni.prenotazioni ?? [], pianoMap);

        const prenotatiKeys = new Set(
          prenotazioni.prenotazioni.map(p => bookingKey(p.adsceId, p.appId)),
        );
        const prenotazioniMap = new Map(
          prenotazioni.prenotazioni.map(p => [bookingKey(p.adsceId, p.appId), p]),
        );

        const mapAppelli = appelli.appelli.map(a =>
          mapAppello(a, pianoMap, prenotazioniMap, prenotatiKeys, infoByAdsce),
        );

        const keysGiaPresenti = new Set(appelli.appelli.map(a => bookingKey(a.adsceId, a.appId)));
        const docenteByAdsce = new Map(
          appelli.appelli.filter(a => a.docente).map(a => [a.adsceId, a.docente]),
        );
        const prenotatiExtra = prenotazioni.prenotazioni
          .filter(p => !keysGiaPresenti.has(bookingKey(p.adsceId, p.appId)))
          .map(p => mapIscrizione(p, pianoMap, docenteByAdsce));

        this.exams.set([...mapAppelli, ...prenotatiExtra]);
        this.examsLoading.set(false);

        const appelliMap = new Map<string, BookableSession>();
        for (const a of appelli.appelli) {
          if (a.adCod) appelliMap.set(a.adCod, a);
        }

        const suggested = (suggeriti.esami ?? []).map(s => {
          const appello = appelliMap.get(s.adCod);
          if (appello) {
            return mapAppello(appello, pianoMap, prenotazioniMap, prenotatiKeys, infoByAdsce);
          }
          return {
            id: s.adCod,
            courseName: s.adDes ?? 'N/D',
            courseAcronym: s.adCod ?? 'N/D',
            cfu: s.cfu ?? 0,
            year: s.annoCorso ?? 0,
            date: 'N/D',
            time: 'N/D',
            location: 'N/D',
            building: 'N/D',
            professor: 'N/D',
            enrollDeadline: 'N/D',
            spotsLeft: 0,
            spotsTotal: 0,
            status: 'no-exam' as BookingExamStatus,
            dataInizioIscr: 'N/D',
          };
        });
        this.suggestedExams.set(suggested);
        this.suggestedLoading.set(false);
      },
      error: () => {
        this.examsError.set(true);
        this.examsLoading.set(false);
        this.suggestedError.set(true);
        this.suggestedLoading.set(false);
      },
    });
  }

  onTabChange(id: string): void {
    this.activeTab.set(id);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: id },
      queryParamsHandling: 'merge',
    });
  }

  onBookExam(exam: Exam): void {
    if (exam.status === 'booked') {
      this.toast.warning(`Sei già iscritto all'appello di ${exam.courseName}.`, { duration: 4000 });
      return;
    }
    if (exam.status === 'closed') {
      this.toast.error(`Le iscrizioni per ${exam.courseName} sono chiuse.`, { duration: 4000 });
      return;
    }
    this.selectedExam.set(exam);
    this.confirmModal.open();
  }

  onConfirmYes(): void {
    this.confirmModal.close('button');
    this.bookingPassword.set('');
    this.passwordModal.open();
  }

  onConfirmNo(): void {
    this.confirmModal.close('button');
    this.selectedExam.set(null);
  }

  onPasswordChange(val: string | number): void {
    this.bookingPassword.set(String(val));
  }

  onSubmitBooking(): void {
    const exam = this.selectedExam();
    const password = this.bookingPassword();

    if (!exam || !password) {
      return;
    }

    if (exam.cdsId == null || exam.adId == null || exam.appId == null || exam.adsceId == null) {
      this.toast.error('Dati appello incompleti, impossibile prenotare.', { duration: 4000 });
      return;
    }

    this.bookingLoading.set(true);

    this.carriera
      .bookExam({
        cdsId: exam.cdsId,
        adId: exam.adId,
        appId: exam.appId,
        adsceId: exam.adsceId,
        password,
      })
      .subscribe({
        next: () => {
          this.bookingLoading.set(false);
          this.passwordModal.close('button');
          this.bookingPassword.set('');
          this.toast.success(`Prenotazione per ${exam.courseName} effettuata con successo.`, {
            duration: 5000,
          });
          this.exams.update(list =>
            list.map(e => (e.id === exam.id ? { ...e, status: 'booked' as BookingExamStatus } : e)),
          );
          this.selectedExam.set(null);
        },
        error: err => {
          this.bookingLoading.set(false);

          let msg = 'Prenotazione non riuscita. Verifica la password e riprova.';
          const raw = err?.error;

          if (raw) {
            let parsed = raw;
            if (typeof raw === 'string') {
              try {
                parsed = JSON.parse(raw);
              } catch {
                parsed = raw;
              }
            }
            if (parsed && typeof parsed === 'object' && parsed.retErrMsg) {
              msg = parsed.retErrMsg;
            } else if (typeof parsed === 'string' && parsed.trim().length > 0) {
              msg = parsed;
            }
          }

          if (msg.toLowerCase().includes('questionario')) {
            msg = `Per prenotarti devi prima compilare il questionario di valutazione della didattica di ${exam.courseName}. Lo trovi nel tab "Questionari".`;
          }

          if (err?.status === 401) {
            msg = 'Password errata. Riprova.';
          }

          this.toast.error(msg, { duration: 7000 });
        },
      });
  }

  onCancelExam(exam: Exam): void {
    if (exam.status !== 'booked') return;
    if (exam.cdsId == null || exam.adId == null || exam.appId == null) {
      this.toast.error('Dati appello incompleti, impossibile annullare.', { duration: 4000 });
      return;
    }
    this.examToCancel.set(exam);
    this.cancelPassword.set('');
    this.cancelModal.open();
  }

  onCancelPasswordChange(val: string | number): void {
    this.cancelPassword.set(String(val));
  }

  onSubmitCancel(): void {
    const exam = this.examToCancel();
    const password = this.cancelPassword();
    if (!exam || !password) return;
    if (exam.cdsId == null || exam.adId == null || exam.appId == null) {
      this.toast.error('Dati appello incompleti, impossibile annullare.', { duration: 4000 });
      return;
    }

    this.cancelling.set(true);
    this.carriera
      .cancelBooking({
        cdsId: exam.cdsId,
        adId: exam.adId,
        appId: exam.appId,
        password,
      })
      .subscribe({
        next: () => {
          this.cancelling.set(false);
          this.cancelModal.close('button');
          this.cancelPassword.set('');
          this.toast.success(`Prenotazione per ${exam.courseName} annullata.`, { duration: 5000 });
          this.examToCancel.set(null);
          this.reload();
        },
        error: err => {
          this.cancelling.set(false);
          let msg = 'Annullamento non riuscito. Verifica la password e riprova.';
          const raw = err?.error;
          if (raw) {
            let parsed = raw;
            if (typeof raw === 'string') {
              try {
                parsed = JSON.parse(raw);
              } catch {
                parsed = raw;
              }
            }
            if (parsed && typeof parsed === 'object' && parsed.retErrMsg) {
              msg = parsed.retErrMsg;
            } else if (typeof parsed === 'string' && parsed.trim().length > 0) {
              msg = parsed;
            }
          }
          if (err?.status === 401) {
            msg = 'Password errata. Riprova.';
          }
          this.toast.error(msg, { duration: 7000 });
        },
      });
  }
}
