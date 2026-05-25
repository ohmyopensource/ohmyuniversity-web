export type PricingAudience = 'organizations' | 'institutions';

export interface PricingFeature {
  label: string;
  included: boolean | string;
}

export interface PricingPlan {
  name: string;
  badge?: string;
  price: string;
  priceDetail: string;
  description: string;
  cta: string;
  ctaLink: string;
  highlighted: boolean;
  features: PricingFeature[];
}