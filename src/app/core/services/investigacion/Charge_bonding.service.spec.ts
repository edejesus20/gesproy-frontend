/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Charge_bondingService } from './Charge_bonding.service';

describe('Service: Charge_bonding', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Charge_bondingService]
    });
  });

  it('should ...', inject([Charge_bondingService], (service: Charge_bondingService) => {
    expect(service).toBeTruthy();
  }));
});
