import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PricingPlans } from '../components/pricing-plans/pricing-plans'; 
import { PricingGuarantees } from '../components/pricing-guarantees/pricing-guarantees';
import { PricingAudience, PricingPlan } from '../pricing.types';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [RouterLink, PricingGuarantees, PricingPlans],
  templateUrl: './pricing.page.html',
})
export class PricingPage {
  readonly audience = signal<PricingAudience>('organizations');

  setAudience(value: PricingAudience): void {
    this.audience.set(value);
  }

  readonly orgPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: '9,90€',
      priceDetail: 'al mese, IVA esclusa',
      description:
        'Perfetto per startup, piccoli team e collettivi studenteschi che vogliono iniziare a raggiungere studenti.',
      cta: 'Inizia la prova gratuita',
      ctaLink: '/business/registrazione',
      highlighted: false,
      features: [
        { label: 'Profilo organizzazione verificato', included: true },
        { label: 'Opportunità pubblicate contemporaneamente', included: '3' },
        { label: 'Utenti amministratori', included: '1' },
        { label: 'Targeting per ateneo', included: true },
        { label: 'Targeting per corso di laurea', included: false },
        { label: 'Analytics base (visualizzazioni)', included: true },
        { label: 'Analytics avanzate (candidature, tasso conversione)', included: false },
        { label: 'Raccolta candidature in-app', included: true },
        { label: 'Esportazione dati candidature', included: false },
        { label: 'Supporto email', included: true },
        { label: 'Account manager dedicato', included: false },
      ],
    },
    {
      name: 'Professional',
      badge: 'Più scelto',
      price: '29,90€',
      priceDetail: 'al mese, IVA esclusa',
      description:
        'Per aziende e organizzazioni che vogliono targeting preciso, analytics complete e un flusso di candidature professionale.',
      cta: 'Inizia la prova gratuita',
      ctaLink: '/business/registrazione',
      highlighted: true,
      features: [
        { label: 'Profilo organizzazione verificato', included: true },
        { label: 'Opportunità pubblicate contemporaneamente', included: '∞' },
        { label: 'Utenti amministratori', included: '3' },
        { label: 'Targeting per ateneo', included: true },
        { label: 'Targeting per corso di laurea', included: true },
        { label: 'Analytics base (visualizzazioni)', included: true },
        { label: 'Analytics avanzate (candidature, tasso conversione)', included: true },
        { label: 'Raccolta candidature in-app', included: true },
        { label: 'Esportazione dati candidature', included: true },
        { label: 'Supporto email prioritario', included: true },
        { label: 'Account manager dedicato', included: false },
      ],
    },
    {
      name: 'Enterprise',
      price: '79,90€',
      priceDetail: 'al mese, IVA esclusa',
      description:
        'Per grandi aziende con esigenze personalizzate, integrazione con sistemi HR esistenti e SLA garantiti.',
      cta: 'Contattaci',
      ctaLink: '/business/contatti',
      highlighted: false,
      features: [
        { label: 'Profilo organizzazione verificato', included: true },
        { label: 'Opportunità pubblicate contemporaneamente', included: '∞' },
        { label: 'Utenti amministratori', included: '∞' },
        { label: 'Targeting per ateneo', included: true },
        { label: 'Targeting per corso di laurea', included: true },
        { label: 'Analytics base (visualizzazioni)', included: true },
        { label: 'Analytics avanzate (candidature, tasso conversione)', included: true },
        { label: 'Raccolta candidature in-app', included: true },
        { label: 'Esportazione dati candidature', included: true },
        { label: 'Supporto dedicato 24/5', included: true },
        { label: 'Account manager dedicato', included: true },
      ],
    },
  ];

  readonly institutionPlans: PricingPlan[] = [
    {
      name: 'Campus Base',
      price: '199€',
      priceDetail: 'al mese, IVA esclusa',
      description:
        "L'essenziale per portare i tuoi studenti su OhMyUniversity con l'integrazione SSO e la dashboard accademica completa.",
      cta: 'Richiedi una demo',
      ctaLink: '/business/contatti',
      highlighted: false,
      features: [
        { label: 'Integrazione SSO istituzionale', included: true },
        { label: 'Dashboard studenti (esami, CFU, media)', included: true },
        { label: 'Dashboard docenti e staff', included: true },
        { label: 'Notifiche push scadenze accademiche', included: true },
        { label: 'Servizio mensa digitale', included: false },
        { label: 'Servizio navetta e trasporti', included: false },
        { label: 'Prenotazione aule e spazi', included: false },
        { label: 'Bacheca comunicazioni ateneo', included: true },
        { label: 'Branding personalizzato ateneo', included: false },
        { label: 'API access per integrazioni custom', included: false },
        { label: 'SLA garantito (99,5% uptime)', included: false },
      ],
    },
    {
      name: 'Campus Pro',
      badge: 'Consigliato',
      price: '449€',
      priceDetail: 'al mese, IVA esclusa',
      description:
        "Porta tutta la vita universitaria in un'unica app: dall'aula alla mensa, dalla navetta alla prenotazione degli spazi.",
      cta: 'Richiedi una demo',
      ctaLink: '/business/contatti',
      highlighted: true,
      features: [
        { label: 'Integrazione SSO istituzionale', included: true },
        { label: 'Dashboard studenti (esami, CFU, media)', included: true },
        { label: 'Dashboard docenti e staff', included: true },
        { label: 'Notifiche push scadenze accademiche', included: true },
        { label: 'Servizio mensa digitale', included: true },
        { label: 'Servizio navetta e trasporti', included: true },
        { label: 'Prenotazione aule e spazi', included: true },
        { label: 'Bacheca comunicazioni ateneo', included: true },
        { label: 'Branding personalizzato ateneo', included: true },
        { label: 'API access per integrazioni custom', included: false },
        { label: 'SLA garantito (99,5% uptime)', included: true },
      ],
    },
    {
      name: 'Campus Enterprise',
      price: 'Su misura',
      priceDetail: 'contattaci per un preventivo',
      description:
        'Una soluzione completamente personalizzata per grandi atenei con esigenze specifiche e sistemi legacy da integrare.',
      cta: 'Contattaci',
      ctaLink: '/business/contatti',
      highlighted: false,
      features: [
        { label: 'Integrazione SSO istituzionale', included: true },
        { label: 'Dashboard studenti (esami, CFU, media)', included: true },
        { label: 'Dashboard docenti e staff', included: true },
        { label: 'Notifiche push scadenze accademiche', included: true },
        { label: 'Servizio mensa digitale', included: true },
        { label: 'Servizio navetta e trasporti', included: true },
        { label: 'Prenotazione aule e spazi', included: true },
        { label: 'Bacheca comunicazioni ateneo', included: true },
        { label: 'Branding personalizzato ateneo', included: true },
        { label: 'API access per integrazioni custom', included: true },
        { label: 'SLA garantito (99,9% uptime)', included: true },
      ],
    },
  ];

  readonly activePlans = (): PricingPlan[] =>
    this.audience() === 'organizations' ? this.orgPlans : this.institutionPlans;


}
