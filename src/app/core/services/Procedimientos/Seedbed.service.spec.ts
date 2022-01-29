/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeedbedService } from './Seedbed.service';

describe('Service: Seedbed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeedbedService]
    });
  });

  it('should ...', inject([SeedbedService], (service: SeedbedService) => {
    expect(service).toBeTruthy();
  }));
});
