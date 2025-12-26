import { TestBed } from '@angular/core/testing';

import { Currncy } from './currency';

describe('Currncy', () => {
  let service: Currncy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Currncy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
