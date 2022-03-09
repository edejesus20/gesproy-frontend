/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Productivity_trackingService } from './productivity_tracking.service';

describe('Service: Productivity_tracking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Productivity_trackingService]
    });
  });

  it('should ...', inject([Productivity_trackingService], (service: Productivity_trackingService) => {
    expect(service).toBeTruthy();
  }));
});
