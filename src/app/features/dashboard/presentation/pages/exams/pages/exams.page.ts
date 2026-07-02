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

  readonly tabs: TabItem[] = [
    { id: 'exams', label: 'Appelli', icon: LucideCalendarDays },
    { id: 'suggested', label: 'Suggeriti', icon: LucideSparkles },
    { id: 'questionnaires', label: 'Questionari', icon: LucideClipboardList },
  ];

  readonly suggestedLoading = signal(true);
  readonly suggestedError = signal(false);
  readonly suggestedExams = signal<Exam[]>([]);

  readonly activeTab = signal<string>('exams');
  readonly examsLoading = signal(true);
  readonly examsError = signal(false);
  readonly exams = signal<Exam[]>([]);
  @ViewChild('confirmModal') confirmModal!: CustomModalComponent;
  @ViewChild('passwordModal') passwordModal!: CustomModalComponent;

  readonly iconCalendarCheck = LucideCalendarCheck;
  readonly iconLock = LucideLock;
  readonly iconAlert = LucideTriangleAlert;

  readonly userEmail = signal<string>('');
  readonly selectedExam = signal<Exam | null>(null);
  readonly bookingPassword = signal<string>('');
  readonly bookingLoading = signal(false);

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

    forkJoin({
      appelli: this.carriera.getBookableSessions(),
      prenotazioni: this.carriera.getBookings(),
      piano: this.carriera.getStudyPlan(),
      suggeriti: this.carriera.getRecommendations(),
      info: this.carriera.getCareerInfo(),
    }).subscribe({
      next: ({ appelli, prenotazioni, piano, suggeriti, info }) => {
        this.userEmail.set(info.emailAte ?? info.email ?? 'N/D');
        const pianoMap = new Map<string, { cfu: number; annoCorso: number }>();
        for (const riga of piano.righe ?? []) {
          if (riga.adCod)
            pianoMap.set(riga.adCod, { cfu: riga.cfu ?? 0, annoCorso: riga.annoCorso ?? 0 });
        }

        const infoByAdsce = new Map<number, { cfu: number; annoCorso: number }>();
        for (const p of prenotazioni.prenotazioni ?? []) {
          const info = pianoMap.get(p.adStuCod);
          if (info) infoByAdsce.set(p.adsceId, info);
        }

        const prenotatiKeys = new Set(
          prenotazioni.prenotazioni.map(p => this.bookingKey(p.adsceId, p.appId)),
        );
        const prenotazioniMap = new Map(
          prenotazioni.prenotazioni.map(p => [this.bookingKey(p.adsceId, p.appId), p]),
        );

        const mapAppelli = appelli.appelli.map(a =>
          this.mapAppello(a, pianoMap, prenotazioniMap, prenotatiKeys, infoByAdsce),
        );

        const keysGiaPresenti = new Set(
          appelli.appelli.map(a => this.bookingKey(a.adsceId, a.appId)),
        );
        const docenteByAdsce = new Map(
          appelli.appelli.filter(a => a.docente).map(a => [a.adsceId, a.docente]),
        );
        const prenotatiExtra = prenotazioni.prenotazioni
          .filter(p => !keysGiaPresenti.has(this.bookingKey(p.adsceId, p.appId)))
          .map(p => this.mapIscrizione(p, pianoMap, docenteByAdsce));

        this.exams.set([...mapAppelli, ...prenotatiExtra]);
        this.examsLoading.set(false);

        const appelliMap = new Map<string, BookableSession>();
        for (const a of appelli.appelli) {
          if (a.adCod) appelliMap.set(a.adCod, a);
        }

        const suggested = (suggeriti.esami ?? []).map(s => {
          const appello = appelliMap.get(s.adCod);
          if (appello) {
            return this.mapAppello(appello, pianoMap, prenotazioniMap, prenotatiKeys, infoByAdsce);
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

  private mapAppello(
    a: BookableSession,
    pianoMap: Map<string, { cfu: number; annoCorso: number }>,
    prenotazioniMap: Map<string, Booking>,
    prenotatiKeys: Set<string>,
    infoByAdsce: Map<number, { cfu: number; annoCorso: number }>,
  ): Exam {
    const oggi = new Date();
    const parseData = (s: string | null): Date | null => {
      if (!s) return null;
      const parts = s.split(' ')[0].split('/');
      if (parts.length !== 3) return null;
      return new Date(+parts[2], +parts[1] - 1, +parts[0]);
    };

    const dataFineIscr = parseData(a.dataFineIscr);
    const dataInizioIscr = parseData(a.dataInizioIscr);
    const isPrenotato = prenotatiKeys.has(this.bookingKey(a.adsceId, a.appId));
    const prenotazione = prenotazioniMap.get(this.bookingKey(a.adsceId, a.appId));
    const pianoInfo = infoByAdsce.get(a.adsceId) ??
      pianoMap.get(a.adCod) ?? { cfu: 0, annoCorso: 0 };

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
        status = 'closed';
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
      date: this.formatData(prenotazione?.dataOraTurno ?? a.dataInizioApp),
      time: ora,
      location: prenotazione?.aulaDes ?? 'N/D',
      building: 'N/D',
      professor: a.docente ?? 'N/D',
      enrollDeadline: this.formatData(a.dataFineIscr),
      spotsLeft: prenotazione?.numIscritti ?? a.numIscritti ?? 0,
      spotsTotal: 0,
      position: prenotazione?.posizApp,
      status,
      dataInizioIscr: this.formatData(a.dataInizioIscr),
      cdsId: a.cdsId,
      adId: a.adId,
      appId: a.appId,
      adsceId: a.adsceId,
    } as any;
  }

  private mapIscrizione(
    p: Booking,
    pianoMap: Map<string, { cfu: number; annoCorso: number }>,
    docenteByAdsce: Map<number, string>,
  ): Exam {
    const pianoInfo = pianoMap.get(p.adStuCod) ?? { cfu: 0, annoCorso: 0 };
    const ora = p.dataOraTurno?.includes(' ')
      ? p.dataOraTurno.split(' ')[1].substring(0, 5)
      : 'N/D';

    return {
      id: String(p.applistaId),
      courseName: p.adStuDes ?? 'N/D',
      courseAcronym: p.adStuCod ?? 'N/D',
      cfu: pianoInfo.cfu,
      year: pianoInfo.annoCorso,
      date: this.formatData(p.dataOraTurno),
      time: ora,
      location: p.aulaDes ?? 'N/D',
      building: 'N/D',
      professor: docenteByAdsce.get(p.adsceId) ?? 'N/D',
      enrollDeadline: this.formatData(p.dataFineIscr),
      spotsLeft: p.numIscritti ?? 0,
      spotsTotal: 0,
      position: p.posizApp,
      status: 'booked' as BookingExamStatus,
      dataInizioIscr: this.formatData(p.dataInizioIscr),
    } as any;
  }

  private formatData(s: string | null): string {
    if (!s) return 'N/D';
    const parts = s.split(' ')[0].split('/');
    if (parts.length !== 3) return s;
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }

  private bookingKey(adsceId: number, appId: number): string {
    return `${adsceId}:${appId}`;
  }
}
