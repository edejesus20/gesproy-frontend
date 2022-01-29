/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_proyectosdeinvestigacionComponent } from './edit_proyectosdeinvestigacion.component';

describe('Edit_proyectosdeinvestigacionComponent', () => {
  let component: Edit_proyectosdeinvestigacionComponent;
  let fixture: ComponentFixture<Edit_proyectosdeinvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_proyectosdeinvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_proyectosdeinvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
