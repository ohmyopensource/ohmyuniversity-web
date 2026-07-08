import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideArrowLeft,
  LucideClipboardList,
  LucideClipboardCheck,
  LucideUser,
  LucideLoaderCircle,
  LucideTriangleAlert,
  LucideChevronRight,
} from '@lucide/angular';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';
import { ToastService } from '@ui/custom-toast/toast.service';
import { SurveyModule, SurveyUnitsResponse } from 'src/app/core/domain/models/career/surveys.model';

@Component({
  selector: 'app-survey-units',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './survey-units.component.html',
})
export class SurveyUnitsPage implements OnInit {
  private readonly carriera = inject(CareerFacade);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly iconBack = LucideArrowLeft;
  readonly iconClipboard = LucideClipboardList;
  readonly iconClipboardDone = LucideClipboardCheck;
  readonly iconUser = LucideUser;
  readonly iconLoader = LucideLoaderCircle;
  readonly iconAlert = LucideTriangleAlert;
  readonly iconChevron = LucideChevronRight;

  private adsceId = 0;

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly data = signal<SurveyUnitsResponse | null>(null);

  readonly moduli = computed<SurveyModule[]>(() => this.data()?.moduli ?? []);
  readonly title = computed(() => this.data()?.questionarioDes ?? 'Questionari');
  readonly allDone = computed(() => {
    const m = this.moduli();
    return m.length > 0 && m.every(x => x.statoLink === 1);
  });

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('adsceId');
    this.adsceId = param ? Number(param) : 0;
    if (!this.adsceId) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.carriera.getSurveyUnits(this.adsceId).subscribe({
      next: res => {
        this.data.set(this.applyOptimisticConfirmation(res));
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  /**
   * Marks the just-confirmed module as done client-side, regardless of what
   * Cineca's own read endpoint currently reports. Cineca can take a brief
   * moment to reflect a "conferma" on this same read path, and without this
   * override the module would still show as pending right after returning
   * from the compilation wizard, only "fixing itself" a navigation or two
   * later. The navigation state is only present on the single navigation
   * that follows a successful confirm, so this never masks a genuinely
   * pending module on a normal visit to this page.
   */
  private applyOptimisticConfirmation(res: SurveyUnitsResponse): SurveyUnitsResponse {
    const confirmedTags = (history.state as { justConfirmedTags?: string })?.justConfirmedTags;
    if (!confirmedTags) {
      return res;
    }
    return {
      ...res,
      moduli: res.moduli.map(m => (m.tags === confirmedTags ? { ...m, statoLink: 1 } : m)),
    };
  }

  isDone(m: SurveyModule): boolean {
    return m.statoLink === 1;
  }

  isPending(m: SurveyModule): boolean {
    return m.statoLink === 2 || m.statoLink === 3;
  }

  /** Raw tipo-credito code from the tags string (e.g. LEZ / LAB), no translation. */
  moduleCode(tags: string): string | null {
    for (const part of (tags ?? '').split('|')) {
      if (part.startsWith('TIPO_CRE_AD_COD_VAL:')) {
        const c = part.substring('TIPO_CRE_AD_COD_VAL:'.length).trim();
        return c || null;
      }
    }
    return null;
  }

  moduleChip(m: SurveyModule, index: number): string {
    return m.moduloLabel ?? this.moduleCode(m.tags) ?? `Parte ${index + 1}`;
  }

  onCompila(m: SurveyModule): void {
    if (!this.isPending(m)) return;
    this.router.navigate(['/dashboard/appelli/questionari', this.adsceId, 'compila'], {
      queryParams: { tags: m.tags },
    });
  }

  onBack(): void {
    this.router.navigate(['/dashboard/appelli'], { queryParams: { tab: 'questionnaires' } });
  }
}
