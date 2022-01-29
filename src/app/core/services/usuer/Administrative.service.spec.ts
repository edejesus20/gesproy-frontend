/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdministrativeService } from './Administrative.service';

describe('Service: Administrative', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrativeService]
    });
  });

  it('should ...', inject([AdministrativeService], (service: AdministrativeService) => {
    expect(service).toBeTruthy();
  }));
});
