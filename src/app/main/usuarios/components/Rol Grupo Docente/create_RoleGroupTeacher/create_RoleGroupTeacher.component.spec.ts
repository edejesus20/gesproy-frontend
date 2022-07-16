/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_RoleGroupTeacherComponent } from './create_RoleGroupTeacher.component';

describe('Create_RoleGroupTeacherComponent', () => {
  let component: Create_RoleGroupTeacherComponent;
  let fixture: ComponentFixture<Create_RoleGroupTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_RoleGroupTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_RoleGroupTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
