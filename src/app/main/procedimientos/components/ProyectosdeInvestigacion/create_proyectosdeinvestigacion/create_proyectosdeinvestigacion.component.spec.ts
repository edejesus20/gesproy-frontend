/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_proyectosdeinvestigacionComponent } from './create_proyectosdeinvestigacion.component';

describe('Create_proyectosdeinvestigacionComponent', () => {
  let component: Create_proyectosdeinvestigacionComponent;
  let fixture: ComponentFixture<Create_proyectosdeinvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_proyectosdeinvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_proyectosdeinvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
