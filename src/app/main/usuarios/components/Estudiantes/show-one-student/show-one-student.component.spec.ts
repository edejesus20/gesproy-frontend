/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowOneStudentComponent } from './show-one-student.component';

describe('ShowOneStudentComponent', () => {
  let component: ShowOneStudentComponent;
  let fixture: ComponentFixture<ShowOneStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOneStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOneStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
