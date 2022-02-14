/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OcupationService } from './Ocupation.service';

describe('Service: Ocupation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcupationService]
    });
  });

  it('should ...', inject([OcupationService], (service: OcupationService) => {
    expect(service).toBeTruthy();
  }));
});
