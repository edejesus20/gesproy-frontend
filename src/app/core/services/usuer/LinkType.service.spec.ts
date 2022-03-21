/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LinkTypeService } from './LinkType.service';

describe('Service: LinkType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkTypeService]
    });
  });

  it('should ...', inject([LinkTypeService], (service: LinkTypeService) => {
    expect(service).toBeTruthy();
  }));
});
