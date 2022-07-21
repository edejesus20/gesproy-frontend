/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_Kind_of_InvestigationComponent } from './show_one_Kind_of_Investigation.component';

describe('Show_one_Kind_of_InvestigationComponent', () => {
  let component: Show_one_Kind_of_InvestigationComponent;
  let fixture: ComponentFixture<Show_one_Kind_of_InvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_Kind_of_InvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_Kind_of_InvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
