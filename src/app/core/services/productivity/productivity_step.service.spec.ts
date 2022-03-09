/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Productivity_stepService } from './productivity_step.service';

describe('Service: Productivity_step', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Productivity_stepService]
    });
  });

  it('should ...', inject([Productivity_stepService], (service: Productivity_stepService) => {
    expect(service).toBeTruthy();
  }));
});
