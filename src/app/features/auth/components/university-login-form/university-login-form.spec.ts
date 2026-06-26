import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversityLoginFormComponent } from './university-login-form.component';
import { provideRouter, Router } from '@angular/router';
import { ToastService } from '@ui/custom-toast/toast.service';
import { UNIVERSITIES, APP } from '@constants';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { of } from 'rxjs';
import { vi } from 'vitest';

const UNI_WITH_DOMAINS = UNIVERSITIES.find(u => u.emailDomains.length > 0)!;
const UNI_WITHOUT_DOMAINS = UNIVERSITIES.find(u => u.emailDomains.length === 0)!;

const authFacadeMock = {
  login: vi.fn(() => of({ accessToken: 'fake-token' })),
};

describe('UniversityLoginFormComponent', () => {
  let component: UniversityLoginFormComponent;
  let fixture: ComponentFixture<UniversityLoginFormComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    authFacadeMock.login.mockReturnValue(of({ accessToken: 'fake-token' }));

    await TestBed.configureTestingModule({
      imports: [UniversityLoginFormComponent],
      providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacadeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UniversityLoginFormComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  // Creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Initial state
  it('should initialize activeTab as "ateneo"', () => {
    expect(component.activeTab()).toBe('ateneo');
  });

  it('should expose APP.name constant', () => {
    expect(component.APP.name).toBe(APP.name);
  });

  it('should initialize selectedUniversity as undefined', () => {
    expect(component.selectedUniversity).toBeUndefined();
  });

  it('should initialize email as empty string', () => {
    expect(component.email).toBe('');
  });

  it('should initialize password as empty string', () => {
    expect(component.password).toBe('');
  });

  it('should define three tabs: ateneo, spid, cie', () => {
    expect(component.tabs).toHaveLength(3);
    expect(component.tabs.map(t => t.id)).toEqual(['ateneo', 'spid', 'cie']);
  });

  it('should expose the full UNIVERSITIES list', () => {
    expect(component.universities).toEqual(UNIVERSITIES);
  });

  // setTab
  it('should update activeTab when setTab is called', () => {
    component.setTab('spid');
    expect(component.activeTab()).toBe('spid');
  });

  it('should switch back to ateneo when setTab is called with "ateneo"', () => {
    component.setTab('cie');
    component.setTab('ateneo');
    expect(component.activeTab()).toBe('ateneo');
  });

  // onUniversitySelected
  it('should set selectedUniversity when onUniversitySelected is called', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    expect(component.selectedUniversity).toEqual(UNI_WITH_DOMAINS);
  });

  it('should reset email when onUniversitySelected is called', () => {
    component.email = 'test@example.com';
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    expect(component.email).toBe('');
  });

  // domainUnavailable
  it('should return false for domainUnavailable when no university is selected', () => {
    expect(component.domainUnavailable).toBe(false);
  });

  it('should return false for domainUnavailable when university has email domains', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    expect(component.domainUnavailable).toBe(false);
  });

  it('should return true for domainUnavailable when university has no email domains', () => {
    component.onUniversitySelected(UNI_WITHOUT_DOMAINS);
    expect(component.domainUnavailable).toBe(true);
  });

  // emailError
  it('should return empty string for emailError when no university is selected', () => {
    component.email = 'test@example.com';
    expect(component.emailError).toBe('');
  });

  it('should return empty string for emailError when email is empty', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    component.email = '';
    expect(component.emailError).toBe('');
  });

  it('should return empty string for emailError when domain is unavailable', () => {
    component.onUniversitySelected(UNI_WITHOUT_DOMAINS);
    component.email = 'test@example.com';
    expect(component.emailError).toBe('');
  });

  it('should return error when email domain does not match university domains', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    component.email = 'test@wrongdomain.it';
    expect(component.emailError).not.toBe('');
  });

  it('should return empty string for emailError when email domain matches university domain', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    component.email = `test@${UNI_WITH_DOMAINS.emailDomains[0]}`;
    expect(component.emailError).toBe('');
  });

  it('should return validation error when email has no @ sign', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    component.email = 'notanemail';
    expect(component.emailError).toContain('valido');
  });

  // canSubmit
  it('should return false for canSubmit when nothing is filled', () => {
    expect(component.canSubmit).toBe(false);
  });

  it('should return false for canSubmit when university is missing', () => {
    component.email = `test@${UNI_WITH_DOMAINS.emailDomains[0]}`;
    component.password = 'secret';
    expect(component.canSubmit).toBe(false);
  });

  it('should return false for canSubmit when domain is unavailable', () => {
    component.onUniversitySelected(UNI_WITHOUT_DOMAINS);
    component.email = 'test@example.com';
    component.password = 'secret';
    expect(component.canSubmit).toBe(false);
  });

  it('should return false for canSubmit when email is invalid', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    component.email = 'test@wrongdomain.it';
    component.password = 'secret';
    expect(component.canSubmit).toBe(false);
  });

  it('should return false for canSubmit when password is empty', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    component.email = `test@${UNI_WITH_DOMAINS.emailDomains[0]}`;
    component.password = '';
    expect(component.canSubmit).toBe(false);
  });

  it('should return true for canSubmit when all fields are valid', () => {
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    component.email = `test@${UNI_WITH_DOMAINS.emailDomains[0]}`;
    component.password = 'secret';
    expect(component.canSubmit).toBe(true);
  });

  // submit
  it('should not navigate when submit is called and canSubmit is false', () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate');
    component.submit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should navigate to /dashboard when submit is called and canSubmit is true', () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate');
    component.onUniversitySelected(UNI_WITH_DOMAINS);
    component.email = `test@${UNI_WITH_DOMAINS.emailDomains[0]}`;
    component.password = 'secret';
    component.submit();
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
  });

  // notifyUnavailable
  it('should call toast.show with warning variant when notifyUnavailable is called with SPID', () => {
    const spy = vi.spyOn(toastService, 'show');
    component.notifyUnavailable('SPID');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('SPID'), 'warning');
  });

  it('should call toast.show with warning variant when notifyUnavailable is called with CIE', () => {
    const spy = vi.spyOn(toastService, 'show');
    component.notifyUnavailable('CIE');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('CIE'), 'warning');
  });

  // Template - ateneo tab
  it('should render the university search select on ateneo tab', () => {
    expect(fixture.nativeElement.querySelector('app-university-search-select')).not.toBeNull();
  });

  it('should render the email input on ateneo tab', () => {
    expect(fixture.nativeElement.querySelector('app-custom-input')).not.toBeNull();
  });

  it('should render the "Password dimenticata" button on ateneo tab', () => {
    expect(fixture.nativeElement.textContent).toContain('Password dimenticata');
  });

  it('should not render the SPID panel on ateneo tab', () => {
    expect(fixture.nativeElement.textContent).not.toContain('Entra con SPID');
  });

  // Template - spid tab
  it('should render the SPID panel after switching to spid tab', () => {
    component.setTab('spid');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Entra con SPID');
  });

  it('should not render the ateneo form after switching to spid tab', () => {
    component.setTab('spid');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-university-search-select')).toBeNull();
  });

  // Template - cie tab
  it('should render the CIE panel after switching to cie tab', () => {
    component.setTab('cie');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Entra con CIE');
  });

  it('should render the domain unavailable warning when university has no email domains', () => {
    component.onUniversitySelected(UNI_WITHOUT_DOMAINS);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('non è ancora disponibile');
  });
});
