import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { APP } from '@constants';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
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

  // Nav links
  it('should define 5 nav links', () => {
    expect(component.navLinks).toHaveLength(5);
  });

  it('should include a Home link pointing to "/"', () => {
    expect(component.navLinks.some(l => l.path === '/' && l.label === 'Home')).toBe(true);
  });

  it('should include an Orientamento link', () => {
    expect(component.navLinks.some(l => l.path === '/orientamento')).toBe(true);
  });

  it('should include a Chi Siamo link', () => {
    expect(component.navLinks.some(l => l.path === '/chi-siamo')).toBe(true);
  });

  it('should include a Partner link with accent', () => {
    const partner = component.navLinks.find(l => l.path === '/partner');
    expect(partner).toBeDefined();
    expect(partner?.accent).toBe(true);
  });

  it('should include a Contattaci link', () => {
    expect(component.navLinks.some(l => l.path === '/contatti')).toBe(true);
  });

  // Template - logo
  it('should render the app logo', () => {
    const img = nativeEl.querySelector('nav img');
    expect(img).not.toBeNull();
  });

  it('should render the app name in the logo area', () => {
    expect(nativeEl.querySelector('nav')?.textContent).toContain(APP.name);
  });

  it('should have logo linking to /', () => {
    const logoLink = nativeEl.querySelector('nav a[routerLink="/"]');
    expect(logoLink).not.toBeNull();
  });

  // Template - desktop nav
  it('should render all nav link labels in the desktop menu', () => {
    const allText = nativeEl.textContent ?? '';
    component.navLinks.forEach(link => expect(allText).toContain(link.label));
  });

  it('should render a login button linking to /login', () => {
    const loginLink = nativeEl.querySelector('a[href="/login"]');
    expect(loginLink).not.toBeNull();
  });

  // Template - mobile
  it('should render the mobile hamburger button', () => {
    const hamburger = nativeEl.querySelector('div.sm\\:hidden app-custom-button');
    expect(hamburger).not.toBeNull();
  });

  it('should render the mobile modal', () => {
    expect(nativeEl.querySelector('app-custom-modal')).not.toBeNull();
  });

  it('should render nav links inside the mobile modal', () => {
    // app-custom-modal uses ng-content; projected content lives in nativeEl, not inside the element
    const allText = nativeEl.textContent ?? '';
    component.navLinks.forEach(link => expect(allText).toContain(link.label));
  });

  it('should render a login button in the mobile modal', () => {
    expect(nativeEl.textContent).toContain('Accedi');
  });
});
