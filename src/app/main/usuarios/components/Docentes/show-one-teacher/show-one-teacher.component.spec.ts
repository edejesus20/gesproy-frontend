/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowOneTeacherComponent } from './show-one-teacher.component';

describe('ShowOneTeacherComponent', () => {
  let component: ShowOneTeacherComponent;
  let fixture: ComponentFixture<ShowOneTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOneTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOneTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
