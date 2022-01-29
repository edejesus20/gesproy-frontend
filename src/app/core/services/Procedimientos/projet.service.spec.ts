/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjetService } from './projet.service';

describe('Service: Projet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjetService]
    });
  });

  it('should ...', inject([ProjetService], (service: ProjetService) => {
    expect(service).toBeTruthy();
  }));
});
