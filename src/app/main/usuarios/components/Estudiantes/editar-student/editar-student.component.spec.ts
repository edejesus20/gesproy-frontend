/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarStudentComponent } from './editar-student.component';

describe('EditarStudentComponent', () => {
  let component: EditarStudentComponent;
  let fixture: ComponentFixture<EditarStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
