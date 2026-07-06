/**
 * @file career-stats.component.ts
 * @description Displays the academic progress bar (earned CFU as a
 * game-style XP bar) plus the four key academic statistics (arithmetic
 * average, weighted average, graduation base, earned CFU) as app-card-stat
 * cards, plus an explanatory info note about how the metrics are computed.
 */

import { Component, input } from '@angular/core';
import { LucideInfo } from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-career-stats',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CardStatusComponent],
  templateUrl: './career-stats.component.html',
})
export class CareerStatsComponent {
  readonly iconInfo = LucideInfo;

  readonly arithmeticAverage = input.required<number>();
  readonly weightedAverage = input.required<number>();
  readonly graduationBase = input.required<number>();
  readonly earnedCfu = input.required<number>();
  readonly totalCfu = input.required<number>();
  readonly cfuProgress = input.required<number>();
  readonly laudeCount = input.required<number>();
  readonly isSimulation = input.required<boolean>();
}
