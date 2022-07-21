/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_Kind_of_InvestigationComponent } from './edit_Kind_of_Investigation.component';

describe('Edit_Kind_of_InvestigationComponent', () => {
  let component: Edit_Kind_of_InvestigationComponent;
  let fixture: ComponentFixture<Edit_Kind_of_InvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_Kind_of_InvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_Kind_of_InvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
