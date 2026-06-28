import { Component, input } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideGraduationCap,
  LucideBuilding,
  LucideCalendar,
  LucideMapPin,
  LucideUser,
  LucideBookOpen,
  LucideHash,
  LucideBadgeCheck,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CareerInfoResponse } from 'src/app/core/domain/models/career/career-info.model';

@Component({
  selector: 'app-profile-course',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, LucideDynamicIcon],
  templateUrl: './profile-course.component.html',
})
export class ProfileCourseComponent {
  readonly info = input.required<CareerInfoResponse>();

  readonly iconGraduationCap = LucideGraduationCap;
  readonly iconBuilding = LucideBuilding;
  readonly iconCalendar = LucideCalendar;
  readonly iconMapPin = LucideMapPin;
  readonly iconUser = LucideUser;
  readonly iconBookOpen = LucideBookOpen;
  readonly iconHash = LucideHash;
  readonly iconBadgeCheck = LucideBadgeCheck;

  formatData(s: string | null): string {
    if (!s) return '-';
    const parts = s.split(' ')[0].split('/');
    if (parts.length !== 3) return s;
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }

  val(s: string | number | null | undefined): string {
    if (s === null || s === undefined || s === '') return '-';
    return String(s);
  }

  statoVariant(staStuCod: string): 'success' | 'warning' | 'error' | 'neutral' {
    const map: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
      A: 'success',
      S: 'warning',
      C: 'neutral',
    };
    return map[staStuCod] ?? 'neutral';
  }

  isLaureato(): boolean {
    return this.info().attlauFlg === 1;
  }

  statoLabel(staStuCod: string): string {
    if (this.isLaureato()) return 'Laurea Conseguita';
    const map: Record<string, string> = {
      A: 'Attivo',
      S: 'Sospeso',
      C: 'Cessato',
      X: 'Cessato',
    };
    return map[staStuCod] ?? this.info().statiStuDes ?? 'Cessato';
  }
}
