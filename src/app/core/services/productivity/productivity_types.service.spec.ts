/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Productivity_typesService } from './productivity_types.service';

describe('Service: Productivity_types', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Productivity_typesService]
    });
  });

  it('should ...', inject([Productivity_typesService], (service: Productivity_typesService) => {
    expect(service).toBeTruthy();
  }));
});
