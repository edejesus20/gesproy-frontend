/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelationshipService } from './Relationship.service';

describe('Service: Relationship', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelationshipService]
    });
  });

  it('should ...', inject([RelationshipService], (service: RelationshipService) => {
    expect(service).toBeTruthy();
  }));
});
