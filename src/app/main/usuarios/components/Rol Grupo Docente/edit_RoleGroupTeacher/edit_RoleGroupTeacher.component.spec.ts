/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_RoleGroupTeacherComponent } from './edit_RoleGroupTeacher.component';

describe('Edit_RoleGroupTeacherComponent', () => {
  let component: Edit_RoleGroupTeacherComponent;
  let fixture: ComponentFixture<Edit_RoleGroupTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_RoleGroupTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_RoleGroupTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
