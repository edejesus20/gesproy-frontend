/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowStudentComponent } from './show-student.component';

describe('ShowStudentComponent', () => {
  let component: ShowStudentComponent;
  let fixture: ComponentFixture<ShowStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
