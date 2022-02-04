/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarTeacherComponent } from './editar-teacher.component';

describe('EditarTeacherComponent', () => {
  let component: EditarTeacherComponent;
  let fixture: ComponentFixture<EditarTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
