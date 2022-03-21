/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_InvestigatorCollaboratorComponent } from './show_InvestigatorCollaborator.component';

describe('Show_InvestigatorCollaboratorComponent', () => {
  let component: Show_InvestigatorCollaboratorComponent;
  let fixture: ComponentFixture<Show_InvestigatorCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_InvestigatorCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_InvestigatorCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
