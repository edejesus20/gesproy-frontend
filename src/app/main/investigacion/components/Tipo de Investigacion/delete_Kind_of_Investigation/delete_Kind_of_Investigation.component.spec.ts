/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_Kind_of_InvestigationComponent } from './delete_Kind_of_Investigation.component';

describe('Delete_Kind_of_InvestigationComponent', () => {
  let component: Delete_Kind_of_InvestigationComponent;
  let fixture: ComponentFixture<Delete_Kind_of_InvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_Kind_of_InvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_Kind_of_InvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
