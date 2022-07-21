/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectModalityService } from './ProjectModality.service';

describe('Service: ProjectModality', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectModalityService]
    });
  });

  it('should ...', inject([ProjectModalityService], (service: ProjectModalityService) => {
    expect(service).toBeTruthy();
  }));
});
