/**
 * @file corso-laurea-card.component.ts
 * @description Presentational card for a single national degree program entry
 * returned by the Roadmap "magistrali affini" endpoint. Shows admission type
 * and teaching mode as badges, and a search link (not a guaranteed direct link)
 * to the course's Universitaly page.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideSearch } from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent, BadgeVariant } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CorsoLaureaNazionale } from 'src/app/core/domain/models/roadmap/corso-laurea-nazionale.model';

@Component({
  selector: 'app-corso-laurea-card',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, CustomBadgeComponent, CustomButtonComponent],
  templateUrl: './corso-laurea-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorsoLaureaCardComponent {
  readonly iconSearch = LucideSearch;

  /** The national degree program entry to display. */
  @Input({ required: true }) corso!: CorsoLaureaNazionale;

  /**
   * Maps the MUR "accesso" field to a badge visual variant — free access
   * reads as positive, restricted access as a caution signal.
   *
   * @returns Badge variant matching the admission type.
   */
  accessoVariant(): BadgeVariant {
    if (!this.corso.accesso) return 'neutral';
    return this.corso.accesso.toLowerCase().includes('libero') ? 'success' : 'warning';
  }

  /**
   * Maps the raw MUR "accesso" value to user-facing copy. "locale" is MUR
   * jargon for admission capped by the individual university (as opposed to
   * a ministry-set national cap like Medicina) — not self-explanatory to
   * students, so it's rendered as "Numero chiuso" instead.
   *
   * @returns Display label for the admission type badge.
   */
  accessoLabel(): string {
    if (!this.corso.accesso) return '';
    return this.corso.accesso.toLowerCase().includes('libero') ? 'Libero' : 'Numero chiuso';
  }
}
