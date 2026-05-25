import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContattiFormAcademic } from './contatti-form-academic';

describe('ContattiFormAcademic', () => {
  let component: ContattiFormAcademic;
  let fixture: ComponentFixture<ContattiFormAcademic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContattiFormAcademic],
    }).compileComponents();

    fixture = TestBed.createComponent(ContattiFormAcademic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
