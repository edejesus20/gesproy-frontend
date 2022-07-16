/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleGroupTeacherService } from './RoleGroupTeacher.service';

describe('Service: RoleGroupTeacher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGroupTeacherService]
    });
  });

  it('should ...', inject([RoleGroupTeacherService], (service: RoleGroupTeacherService) => {
    expect(service).toBeTruthy();
  }));
});
