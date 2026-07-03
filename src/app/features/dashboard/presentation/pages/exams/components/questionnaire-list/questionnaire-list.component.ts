import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideClipboardList,
  LucideClipboardCheck,
  LucideClock,
  LucideInfo,
  LucideExternalLink,
  LucideTriangleAlert,
  LucideChevronRight,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { SurveyExam } from 'src/app/core/domain/models/career/surveys.model';
import { ToastService } from '@ui/custom-toast/toast.service';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';

@Component({
  selector: 'app-questionnaire-list',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CardStatusComponent, LucideDynamicIcon],
  templateUrl: './questionnaire-list.component.html',
})
export class QuestionnaireListComponent implements OnInit {
  private readonly carriera = inject(CareerFacade);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly iconClipboard = LucideClipboardList;
  readonly iconClipboardDone = LucideClipboardCheck;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;
  readonly iconExternal = LucideExternalLink;
  readonly lucideAlertTriangle = LucideTriangleAlert;
  readonly iconChevron = LucideChevronRight;

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly questionari = signal<SurveyExam[]>([]);

  ngOnInit(): void {
    this.carriera.getSurveys().subscribe({
      next: response => {
        const merged = new Map<number, SurveyExam>();
        for (const q of [...response.daCompilare, ...response.compilati]) {
          merged.set(q.adsceId, q);
        }
        this.questionari.set([...merged.values()]);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  onOpen(adsceId: number): void {
    this.router.navigate(['/dashboard/appelli/questionari', adsceId]);
  }

  statoLabel(statoLink: number): string {
    const map: Record<number, string> = {
      2: 'Alcuni da compilare',
      3: 'Da compilare',
    };
    return map[statoLink] ?? 'Da compilare';
  }
}
