/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MincienciaCategoryService } from './MincienciaCategory.service';

describe('Service: MincienciaCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MincienciaCategoryService]
    });
  });

  it('should ...', inject([MincienciaCategoryService], (service: MincienciaCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
