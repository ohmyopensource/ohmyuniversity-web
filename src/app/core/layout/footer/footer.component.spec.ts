import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';
import {
  APP,
  ORGANIZATION,
  FOOTER_NAV_LINKS,
  FOOTER_BUSINESS_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_FAQ_LINKS,
  FOOTER_SOCIALS,
  FOOTER_SUPPORT_LINKS,
  FOOTER_UNIVERSITIES,
} from '@constants';
import { getCurrentYear } from '@shared/utils/date.utils';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  // Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Constants
  it('should expose APP constant', () => {
    expect(component.APP).toBe(APP);
  });

  it('should expose ORGANIZATION constant', () => {
    expect(component.ORGANIZATION).toBe(ORGANIZATION);
  });

  it('should expose navLinks from FOOTER_NAV_LINKS', () => {
    expect(component.navLinks).toBe(FOOTER_NAV_LINKS);
  });

  it('should expose businessLinks from FOOTER_BUSINESS_LINKS', () => {
    expect(component.businessLinks).toBe(FOOTER_BUSINESS_LINKS);
  });

  it('should expose legalLinks from FOOTER_LEGAL_LINKS', () => {
    expect(component.legalLinks).toBe(FOOTER_LEGAL_LINKS);
  });

  it('should expose faqLinks from FOOTER_FAQ_LINKS', () => {
    expect(component.faqLinks).toBe(FOOTER_FAQ_LINKS);
  });

  it('should expose socials from FOOTER_SOCIALS', () => {
    expect(component.socials).toBe(FOOTER_SOCIALS);
  });

  it('should expose supportLinks from FOOTER_SUPPORT_LINKS', () => {
    expect(component.supportLinks).toBe(FOOTER_SUPPORT_LINKS);
  });

  it('should expose universities from FOOTER_UNIVERSITIES', () => {
    expect(component.universities).toBe(FOOTER_UNIVERSITIES);
  });

  it('should set currentYear to the current year', () => {
    expect(component.currentYear).toBe(getCurrentYear());
  });

  // isDashboard input - default false
  it('should default isDashboard to false', () => {
    expect(component.isDashboard()).toBe(false);
  });

  it('should render navLinks when isDashboard is false', () => {
    const allText = nativeEl.textContent ?? '';
    FOOTER_NAV_LINKS.forEach(link => expect(allText).toContain(link.label));
  });

  it('should render businessLinks when isDashboard is false', () => {
    const allText = nativeEl.textContent ?? '';
    FOOTER_BUSINESS_LINKS.forEach(link => expect(allText).toContain(link.label));
  });

  it('should render the "Navigazione" section heading when isDashboard is false', () => {
    expect(nativeEl.textContent).toContain('Navigazione');
  });

  it('should render the "Per le organizzazioni" section heading when isDashboard is false', () => {
    expect(nativeEl.textContent).toContain('Per le organizzazioni');
  });

  it('should NOT render the "FAQ Studenti" section when isDashboard is false', () => {
    expect(nativeEl.textContent).not.toContain('FAQ Studenti');
  });

  // isDashboard input - true
  it('should NOT render the "Navigazione" section when isDashboard is true', () => {
    fixture.componentRef.setInput('isDashboard', true);
    fixture.detectChanges();
    expect(nativeEl.textContent).not.toContain('Navigazione');
  });

  it('should NOT render the "Per le organizzazioni" section when isDashboard is true', () => {
    fixture.componentRef.setInput('isDashboard', true);
    fixture.detectChanges();
    expect(nativeEl.textContent).not.toContain('Per le organizzazioni');
  });

  it('should render the "FAQ Studenti" section when isDashboard is true', () => {
    fixture.componentRef.setInput('isDashboard', true);
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain('FAQ Studenti');
  });

  it('should render faqLinks when isDashboard is true', () => {
    fixture.componentRef.setInput('isDashboard', true);
    fixture.detectChanges();
    const allText = nativeEl.textContent ?? '';
    FOOTER_FAQ_LINKS.forEach(link => expect(allText).toContain(link.label));
  });

  // Always-visible sections
  it('should render the "Legale" section heading', () => {
    expect(nativeEl.textContent).toContain('Legale');
  });

  it('should render legalLinks', () => {
    const allText = nativeEl.textContent ?? '';
    FOOTER_LEGAL_LINKS.forEach(link => expect(allText).toContain(link.label));
  });

  it('should render the "Contatti" section heading', () => {
    expect(nativeEl.textContent).toContain('Contatti');
  });

  it('should render the app email', () => {
    expect(nativeEl.textContent).toContain(APP.email);
  });

  it('should render the "Seguici" heading', () => {
    expect(nativeEl.textContent).toContain('Seguici');
  });

  it('should render all social labels', () => {
    const allText = nativeEl.textContent ?? '';
    FOOTER_SOCIALS.forEach(s => expect(allText).toContain(s.label));
  });

  it('should render the "Supporta il progetto" section heading', () => {
    expect(nativeEl.textContent).toContain('Supporta il progetto');
  });

  it('should render all support link labels', () => {
    const allText = nativeEl.textContent ?? '';
    FOOTER_SUPPORT_LINKS.forEach(s => expect(allText).toContain(s.label));
  });

  // Universities section
  it('should render the "Atenei convenzionati" heading', () => {
    expect(nativeEl.textContent).toContain('Atenei convenzionati');
  });

  it('should render university logos', () => {
    const imgs = nativeEl.querySelectorAll('img[alt]');
    const uniNames = FOOTER_UNIVERSITIES.map(u => u.name);
    const renderedAlts = Array.from(imgs).map(img => img.getAttribute('alt'));
    uniNames.forEach(name => expect(renderedAlts).toContain(name));
  });

  // Bottom bar
  it('should render the organization P.IVA', () => {
    expect(nativeEl.textContent).toContain(ORGANIZATION.piva);
  });

  it('should render the copyright with current year', () => {
    expect(nativeEl.textContent).toContain(getCurrentYear().toString());
  });

  it('should render the app name in the copyright', () => {
    expect(nativeEl.textContent).toContain(APP.name);
  });

  it('should render the organization name', () => {
    expect(nativeEl.textContent).toContain(ORGANIZATION.name);
  });

  // Grid layout
  it('should use lg:grid-cols-6 when isDashboard is false', () => {
    const grid = nativeEl.querySelector('div.lg\\:grid-cols-6');
    expect(grid).not.toBeNull();
  });

  it('should use lg:grid-cols-5 when isDashboard is true', () => {
    fixture.componentRef.setInput('isDashboard', true);
    fixture.detectChanges();
    const grid = nativeEl.querySelector('div.lg\\:grid-cols-5');
    expect(grid).not.toBeNull();
  });
});
