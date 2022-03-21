/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_InvestigatorCollaboratorComponent } from './edit_InvestigatorCollaborator.component';

describe('Edit_InvestigatorCollaboratorComponent', () => {
  let component: Edit_InvestigatorCollaboratorComponent;
  let fixture: ComponentFixture<Edit_InvestigatorCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_InvestigatorCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_InvestigatorCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
