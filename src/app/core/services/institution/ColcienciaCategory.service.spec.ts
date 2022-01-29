/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ColcienciaCategoryService } from './ColcienciaCategory.service';

describe('Service: ColcienciaCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColcienciaCategoryService]
    });
  });

  it('should ...', inject([ColcienciaCategoryService], (service: ColcienciaCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
