/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_InvestigatorCollaboratorComponent } from './show_one_InvestigatorCollaborator.component';

describe('Show_one_InvestigatorCollaboratorComponent', () => {
  let component: Show_one_InvestigatorCollaboratorComponent;
  let fixture: ComponentFixture<Show_one_InvestigatorCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_InvestigatorCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_InvestigatorCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
