/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_InvestigatorCollaboratorComponent } from './delete_InvestigatorCollaborator.component';

describe('Delete_InvestigatorCollaboratorComponent', () => {
  let component: Delete_InvestigatorCollaboratorComponent;
  let fixture: ComponentFixture<Delete_InvestigatorCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_InvestigatorCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_InvestigatorCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
