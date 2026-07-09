/**
 * @file skeleton-presets.ts
 * @description
 * Collection of composed skeleton components covering recurring loading
 * shapes across the app (cards, list items with avatar, stat blocks),
 * built on top of CustomSkeletonComponent and CustomCardComponent.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSkeletonComponent } from './custom-skeleton.component';
import { CustomCardComponent, CardPadding, CardShadow } from '../custom-card/custom-card.component';

/**
 * @brief Skeleton Card Component
 * @description Loading placeholder mimicking CardSimpleComponent's shape:
 * an icon circle, a title line, and two body lines.
 */
@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, CustomSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card [padding]="padding" [shadow]="shadow" [darkTheme]="darkTheme">
      <div class="skeleton-card">
        @if (withIcon) {
          <app-custom-skeleton
            variant="circle"
            size="md"
            animation="shimmer"
            [darkTheme]="darkTheme" />
        }
        <app-custom-skeleton
          variant="text"
          size="lg"
          width="60%"
          animation="shimmer"
          [darkTheme]="darkTheme" />
        <app-custom-skeleton
          variant="text"
          [count]="2"
          animation="shimmer"
          [darkTheme]="darkTheme" />
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .skeleton-card {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
    `,
  ],
})
export class SkeletonCardComponent {
  /** Shows a leading icon-shaped circle above the text lines. */
  @Input() withIcon: boolean = true;

  /** Internal padding, forwarded to the underlying card. */
  @Input() padding: CardPadding = 'md';

  /** Shadow intensity, forwarded to the underlying card. */
  @Input() shadow: CardShadow = 'md';

  /** Applies dark theme styling. */
  @Input() darkTheme: boolean = false;
}

/**
 * @brief Skeleton List Item Component
 * @description Loading placeholder for a single list row: circular avatar
 * plus two text lines (title + subtitle), matching CardMinimalComponent's shape.
 */
@Component({
  selector: 'app-skeleton-list-item',
  standalone: true,
  imports: [CommonModule, CustomSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton-list-item">
      <app-custom-skeleton
        variant="circle"
        [size]="avatarSize"
        animation="shimmer"
        [darkTheme]="darkTheme" />
      <div class="skeleton-list-item__text">
        <app-custom-skeleton
          variant="text"
          width="45%"
          animation="shimmer"
          [darkTheme]="darkTheme" />
        <app-custom-skeleton
          variant="text"
          size="sm"
          width="70%"
          animation="shimmer"
          [darkTheme]="darkTheme" />
      </div>
    </div>
  `,
  styles: [
    `
      .skeleton-list-item {
        display: flex;
        align-items: center;
        gap: 0.85rem;
      }
      .skeleton-list-item__text {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        flex: 1;
        min-width: 0;
      }
    `,
  ],
})
export class SkeletonListItemComponent {
  /** Size of the avatar circle. */
  @Input() avatarSize: 'sm' | 'md' | 'lg' = 'md';

  /** Applies dark theme styling. */
  @Input() darkTheme: boolean = false;
}

/**
 * @brief Skeleton Stat Component
 * @description Loading placeholder matching CardStatComponent's shape:
 * icon block, large value line, and a small label line.
 */
@Component({
  selector: 'app-skeleton-stat',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, CustomSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card [padding]="padding" [shadow]="shadow" [darkTheme]="darkTheme">
      <div class="skeleton-stat">
        <app-custom-skeleton
          variant="rect"
          width="40px"
          height="40px"
          rounded="md"
          animation="shimmer"
          [darkTheme]="darkTheme" />
        <app-custom-skeleton
          variant="text"
          height="2.2rem"
          width="50%"
          animation="shimmer"
          [darkTheme]="darkTheme" />
        <app-custom-skeleton
          variant="text"
          size="sm"
          width="65%"
          animation="shimmer"
          [darkTheme]="darkTheme" />
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .skeleton-stat {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    `,
  ],
})
export class SkeletonStatComponent {
  /** Internal padding, forwarded to the underlying card. */
  @Input() padding: CardPadding = 'md';

  /** Shadow intensity, forwarded to the underlying card. */
  @Input() shadow: CardShadow = 'md';

  /** Applies dark theme styling. */
  @Input() darkTheme: boolean = false;
}
