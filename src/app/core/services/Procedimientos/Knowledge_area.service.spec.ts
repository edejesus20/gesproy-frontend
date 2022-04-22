/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Knowledge_areaService } from './Knowledge_area.service';

describe('Service: Knowledge_area', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Knowledge_areaService]
    });
  });

  it('should ...', inject([Knowledge_areaService], (service: Knowledge_areaService) => {
    expect(service).toBeTruthy();
  }));
});
