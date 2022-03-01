/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvestigadorColaboladorService } from './InvestigadorColabolador.service';

describe('Service: InvestigadorColabolador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestigadorColaboladorService]
    });
  });

  it('should ...', inject([InvestigadorColaboladorService], (service: InvestigadorColaboladorService) => {
    expect(service).toBeTruthy();
  }));
});
