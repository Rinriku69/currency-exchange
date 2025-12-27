import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCard } from './currency-card';

describe('CurrencyCard', () => {
  let component: CurrencyCard;
  let fixture: ComponentFixture<CurrencyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
