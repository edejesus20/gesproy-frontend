/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_RoleGroupTeacherComponent } from './delete_RoleGroupTeacher.component';

describe('Delete_RoleGroupTeacherComponent', () => {
  let component: Delete_RoleGroupTeacherComponent;
  let fixture: ComponentFixture<Delete_RoleGroupTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_RoleGroupTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_RoleGroupTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
