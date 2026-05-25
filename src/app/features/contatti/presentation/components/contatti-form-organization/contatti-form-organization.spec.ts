import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContattiFormOrganization } from './contatti-form-organization';

describe('ContattiFormOrganization', () => {
  let component: ContattiFormOrganization;
  let fixture: ComponentFixture<ContattiFormOrganization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContattiFormOrganization],
    }).compileComponents();

    fixture = TestBed.createComponent(ContattiFormOrganization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
