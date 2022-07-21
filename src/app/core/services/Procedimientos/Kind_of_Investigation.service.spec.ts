/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Kind_of_InvestigationService } from './Kind_of_Investigation.service';

describe('Service: Kind_of_Investigation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Kind_of_InvestigationService]
    });
  });

  it('should ...', inject([Kind_of_InvestigationService], (service: Kind_of_InvestigationService) => {
    expect(service).toBeTruthy();
  }));
});
