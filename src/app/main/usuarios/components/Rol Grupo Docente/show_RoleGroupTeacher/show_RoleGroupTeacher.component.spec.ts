/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_RoleGroupTeacherComponent } from './show_RoleGroupTeacher.component';

describe('Show_RoleGroupTeacherComponent', () => {
  let component: Show_RoleGroupTeacherComponent;
  let fixture: ComponentFixture<Show_RoleGroupTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_RoleGroupTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_RoleGroupTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
