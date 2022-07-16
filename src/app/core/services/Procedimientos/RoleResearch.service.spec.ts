/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleResearchService } from './RoleResearch.service';

describe('Service: RoleResearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleResearchService]
    });
  });

  it('should ...', inject([RoleResearchService], (service: RoleResearchService) => {
    expect(service).toBeTruthy();
  }));
});
