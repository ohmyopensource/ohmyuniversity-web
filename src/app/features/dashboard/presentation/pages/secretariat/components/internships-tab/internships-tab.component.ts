import { Component, input } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideBriefcase,
  LucideTriangleAlert,
  LucideInfo,
  LucideClock,
  LucideCircleCheck,
  LucideCircleX,
  LucideCircleAlert,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { InternshipApplication } from 'src/app/core/domain/models/career/internship.model';

@Component({
  selector: 'app-internships-tab',
  standalone: true,
  imports: [LucideDynamicIcon, CustomCardComponent, CustomBadgeComponent, CardStatusComponent],
  templateUrl: './internships-tab.component.html',
})
export class InternshipsTabComponent {
  readonly applications = input.required<InternshipApplication[]>();
  readonly loading = input.required<boolean>();
  readonly error = input.required<boolean>();
  readonly hasCarriera = input.required<boolean>();

  readonly iconBriefcase = LucideBriefcase;
  readonly iconTriangle = LucideTriangleAlert;
  readonly iconInfo = LucideInfo;
  readonly iconClock = LucideClock;
  readonly iconCheck = LucideCircleCheck;
  readonly iconX = LucideCircleX;
  readonly iconAlert = LucideCircleAlert;

  statusVariant(statusCode: string): 'success' | 'primary' | 'warning' | 'error' | 'neutral' {
    const map: Record<string, 'success' | 'primary' | 'warning' | 'error' | 'neutral'> = {
      AVV: 'success',
      CON: 'primary',
      PRE: 'warning',
      CHI: 'neutral',
      ANN: 'neutral',
      RIF: 'error',
      NAS: 'neutral',
    };
    return map[statusCode] ?? 'neutral';
  }

  statusIcon(statusCode: string): any {
    const map: Record<string, any> = {
      AVV: this.iconCheck,
      CON: this.iconCheck,
      PRE: this.iconClock,
      CHI: this.iconX,
      ANN: this.iconX,
      RIF: this.iconAlert,
      NAS: this.iconAlert,
    };
    return map[statusCode] ?? this.iconClock;
  }

  statusIconColor(statusCode: string): string {
    const map: Record<string, string> = {
      AVV: 'var(--color-success-dark)',
      CON: 'var(--color-primary-dark)',
      PRE: 'var(--color-warning-dark)',
      CHI: 'var(--color-neutral-400)',
      ANN: 'var(--color-neutral-400)',
      RIF: 'var(--color-error-dark)',
      NAS: 'var(--color-neutral-400)',
    };
    return map[statusCode] ?? 'var(--color-neutral-400)';
  }

  statusIconBg(statusCode: string): string {
    const map: Record<string, string> = {
      AVV: 'var(--color-success-light)',
      CON: 'var(--color-primary-light)',
      PRE: 'var(--color-warning-light)',
      CHI: 'var(--color-neutral-100)',
      ANN: 'var(--color-neutral-100)',
      RIF: 'var(--color-error-light)',
      NAS: 'var(--color-neutral-100)',
    };
    return map[statusCode] ?? 'var(--color-neutral-100)';
  }

  formatAcademicYear(year: number): string {
    return `${year}/${year + 1}`;
  }
}
