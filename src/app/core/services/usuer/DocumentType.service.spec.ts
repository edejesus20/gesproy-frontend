/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentTypeService } from './DocumentType.service';

describe('Service: DocumentType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentTypeService]
    });
  });

  it('should ...', inject([DocumentTypeService], (service: DocumentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
