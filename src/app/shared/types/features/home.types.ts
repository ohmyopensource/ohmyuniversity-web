import { StatTrend } from '@ui/custom-card/card-variants.component';
import { CardVariant } from '@ui/custom-card/custom-card.component';
import { StepBase, IconContentBase, Icon } from '@shared/types';

/** Statistic - alias of CardStat */
export interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  trend?: StatTrend;
}

/** Review - alias of CardReviewer */
export interface Review {
  name: string;
  university: string;
  text: string;
  rating?: number;
  avatarSrc?: string;
  verified?: boolean;
}

/** Home page step - alias of StepBase */
export type StepHome = StepBase;

/** Home page feature - alias of IconContentBase */
export interface Feature extends IconContentBase {
  icon: Icon;
  variant?: CardVariant;
}
