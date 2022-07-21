/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_Kind_of_InvestigationComponent } from './create_Kind_of_Investigation.component';

describe('Create_Kind_of_InvestigationComponent', () => {
  let component: Create_Kind_of_InvestigationComponent;
  let fixture: ComponentFixture<Create_Kind_of_InvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_Kind_of_InvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_Kind_of_InvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
