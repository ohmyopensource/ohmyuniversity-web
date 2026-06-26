import { CardVariant } from '@ui/custom-card/custom-card.component';
import { IconContentBase, StepBase, Icon } from '@shared/types';

/** A generic numbered step */
export type Step = StepBase;

/** Onboarding step with estimated duration */
export interface OnboardingStep extends StepBase {
  duration: string;
}

/** Targeting option for campaign configuration */
export interface TargetingOption {
  label: string;
  description: string;
  available: 'tutti' | 'professional' | 'enterprise';
}

/** Metric card displayed in the analytics section */
export interface AnalyticsMetric {
  icon: Icon;
  label: string;
  desc: string;
  variant: CardVariant;
}

/** Requirement entry filtered by organization type */
export interface Requirement {
  label: string;
  forType: 'azienda' | 'collettivo' | 'entrambi';
}

/** Generic icon+content card - offer, differentiator, use case */
export type OfferCard = IconContentBase;
export type Differentiator = IconContentBase;
export type UseCase = IconContentBase;

/** Business user type card with CTA */
export interface UserTypeBusiness extends IconContentBase {
  action: string;
  actionLink: string;
  isExternal: boolean;
  highlight: boolean;
}

/** Contact channel with value and href */
export interface ContactChannel extends IconContentBase {
  value: string;
  href: string;
}
