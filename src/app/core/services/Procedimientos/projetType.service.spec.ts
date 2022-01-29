/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjetTypeService } from './projetType.service';

describe('Service: ProjetType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjetTypeService]
    });
  });

  it('should ...', inject([ProjetTypeService], (service: ProjetTypeService) => {
    expect(service).toBeTruthy();
  }));
});
