import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingGuarantees } from './pricing-guarantees';

describe('PricingGuarantees', () => {
  let component: PricingGuarantees;
  let fixture: ComponentFixture<PricingGuarantees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingGuarantees],
    }).compileComponents();

    fixture = TestBed.createComponent(PricingGuarantees);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
