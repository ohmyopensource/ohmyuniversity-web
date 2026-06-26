import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversitySearchSelectComponent } from './university-search-select.component';
import { UNIVERSITIES } from '@constants';
import { University } from '@types';

const MOCK_UNIVERSITIES: University[] = UNIVERSITIES.slice(0, 5);

describe('UniversitySearchSelectComponent', () => {
  let component: UniversitySearchSelectComponent;
  let fixture: ComponentFixture<UniversitySearchSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversitySearchSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UniversitySearchSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('universities', MOCK_UNIVERSITIES);
    fixture.detectChanges();
  });

  // Creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Initial state
  it('should initialize query as empty string', () => {
    expect(component.query()).toBe('');
  });

  it('should initialize isOpen as false', () => {
    expect(component.isOpen()).toBe(false);
  });

  it('should initialize selected as undefined when not provided', () => {
    expect(component.selected()).toBeUndefined();
  });

  // displayValue
  it('should return empty string as displayValue when nothing is selected and dropdown is closed', () => {
    expect(component.displayValue).toBe('');
  });

  it('should return selected university shortName as displayValue when dropdown is closed', () => {
    fixture.componentRef.setInput('selected', MOCK_UNIVERSITIES[0]);
    expect(component.displayValue).toBe(MOCK_UNIVERSITIES[0].shortName);
  });

  it('should return current query as displayValue when dropdown is open', () => {
    component.onFocus();
    component.onInput('test');
    expect(component.displayValue).toBe('test');
  });

  // filtered
  it('should return all universities when query is empty', () => {
    expect(component.filtered().length).toBe(MOCK_UNIVERSITIES.length);
  });

  it('should filter universities by name', () => {
    const target = MOCK_UNIVERSITIES[0];
    component.onInput(target.name.slice(0, 4).toLowerCase());
    expect(component.filtered().some(u => u.id === target.id)).toBe(true);
  });

  it('should filter universities by shortName', () => {
    const target = MOCK_UNIVERSITIES[0];
    component.onInput(target.shortName.slice(0, 3).toLowerCase());
    expect(component.filtered().some(u => u.id === target.id)).toBe(true);
  });

  it('should return empty array when no university matches the query', () => {
    component.onInput('xyznonexistentuniversity999');
    expect(component.filtered().length).toBe(0);
  });

  it('should filter case-insensitively', () => {
    const target = MOCK_UNIVERSITIES[0];
    component.onInput(target.name.slice(0, 4).toUpperCase());
    expect(component.filtered().some(u => u.id === target.id)).toBe(true);
  });

  // onFocus
  it('should open the dropdown on focus', () => {
    component.onFocus();
    expect(component.isOpen()).toBe(true);
  });

  it('should reset query on focus', () => {
    component.onInput('Bologna');
    component.onFocus();
    expect(component.query()).toBe('');
  });

  // onInput
  it('should update query when onInput is called', () => {
    component.onInput('Politecnico');
    expect(component.query()).toBe('Politecnico');
  });

  // selectUniversity
  it('should close the dropdown when a university is selected', () => {
    component.onFocus();
    component.selectUniversity(MOCK_UNIVERSITIES[0]);
    expect(component.isOpen()).toBe(false);
  });

  it('should reset query when a university is selected', () => {
    component.onInput('test');
    component.selectUniversity(MOCK_UNIVERSITIES[0]);
    expect(component.query()).toBe('');
  });

  it('should emit selectionChange when a university is selected', () => {
    const emitted: University[] = [];
    component.selectionChange.subscribe((u: University) => emitted.push(u));
    component.selectUniversity(MOCK_UNIVERSITIES[0]);
    expect(emitted).toHaveLength(1);
    expect(emitted[0]).toEqual(MOCK_UNIVERSITIES[0]);
  });

  // Template - input
  it('should render the search input', () => {
    expect(fixture.nativeElement.querySelector('input[type="text"]')).not.toBeNull();
  });

  it('should not render the dropdown by default', () => {
    expect(fixture.nativeElement.querySelector('button[type="button"]')).toBeNull();
  });

  // Template - dropdown
  it('should render one button per filtered university when open', () => {
    component.onFocus();
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    expect(buttons.length).toBe(MOCK_UNIVERSITIES.length);
  });

  it('should render "Nessun ateneo trovato" when filtered list is empty', () => {
    component.onFocus();
    component.onInput('xyznonexistentuniversity999');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nessun ateneo trovato');
  });

  it('should close the dropdown when clicking outside the component', () => {
    component.onFocus();
    expect(component.isOpen()).toBe(true);
    component.onDocumentClick(new MouseEvent('click'));
    expect(component.isOpen()).toBe(false);
  });

  it('should not close the dropdown when clicking inside the component', () => {
    component.onFocus();
    const internalEvent = new MouseEvent('click');
    Object.defineProperty(internalEvent, 'target', {
      value: fixture.nativeElement.querySelector('input'),
    });
    component.onDocumentClick(internalEvent);
    expect(component.isOpen()).toBe(true);
  });
});
