/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditFacultiesComponent } from './edit-faculties.component';

describe('EditFacultiesComponent', () => {
  let component: EditFacultiesComponent;
  let fixture: ComponentFixture<EditFacultiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFacultiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFacultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
