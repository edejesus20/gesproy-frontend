/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypeMemberService } from './TypeMember.service';

describe('Service: TypeMember', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeMemberService]
    });
  });

  it('should ...', inject([TypeMemberService], (service: TypeMemberService) => {
    expect(service).toBeTruthy();
  }));
});
