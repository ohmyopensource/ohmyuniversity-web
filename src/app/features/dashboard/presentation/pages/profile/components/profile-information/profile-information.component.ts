import { Component, input } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideUser,
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideShield,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { PersonaResponse } from '../../../../../../../core/domain/models/career/persona.model';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [CustomCardComponent, LucideDynamicIcon],
  templateUrl: './profile-information.component.html',
})
export class ProfileInformationComponent {
  readonly profilo = input.required<PersonaResponse>();

  readonly iconUser = LucideUser;
  readonly iconMail = LucideMail;
  readonly iconPhone = LucidePhone;
  readonly iconMapPin = LucideMapPin;
  readonly iconShield = LucideShield;

  formatData(s: string | null): string {
    if (!s) return '-';
    const parts = s.split(' ')[0].split('/');
    if (parts.length !== 3) return s;
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }

  val(s: string | null | undefined): string {
    if (!s || s.trim() === '') return '-';
    return s;
  }

  sessoLabel(s: string): string {
    if (s === 'M') return 'Maschio';
    if (s === 'F') return 'Femmina';
    return s || '-';
  }
}
