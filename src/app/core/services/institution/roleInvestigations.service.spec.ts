/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleInvestigationsService } from './roleInvestigations.service';

describe('Service: RoleInvestigations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleInvestigationsService]
    });
  });

  it('should ...', inject([RoleInvestigationsService], (service: RoleInvestigationsService) => {
    expect(service).toBeTruthy();
  }));
});
