/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_InvestigatorCollaboratorComponent } from './create_InvestigatorCollaborator.component';

describe('Create_InvestigatorCollaboratorComponent', () => {
  let component: Create_InvestigatorCollaboratorComponent;
  let fixture: ComponentFixture<Create_InvestigatorCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_InvestigatorCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_InvestigatorCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
