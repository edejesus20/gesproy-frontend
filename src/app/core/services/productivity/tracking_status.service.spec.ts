/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Tracking_statusService } from './tracking_status.service';

describe('Service: Tracking_status', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Tracking_statusService]
    });
  });

  it('should ...', inject([Tracking_statusService], (service: Tracking_statusService) => {
    expect(service).toBeTruthy();
  }));
});
