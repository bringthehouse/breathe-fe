import { TestBed, inject } from '@angular/core/testing';

import { BreatheService } from './breathe.service';

describe('BreatheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreatheService]
    });
  });

  it('should be created', inject([BreatheService], (service: BreatheService) => {
    expect(service).toBeTruthy();
  }));
});
