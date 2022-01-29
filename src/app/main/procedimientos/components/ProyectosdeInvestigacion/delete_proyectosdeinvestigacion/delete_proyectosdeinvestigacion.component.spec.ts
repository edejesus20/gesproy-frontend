/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_proyectosdeinvestigacionComponent } from './delete_proyectosdeinvestigacion.component';

describe('Delete_proyectosdeinvestigacionComponent', () => {
  let component: Delete_proyectosdeinvestigacionComponent;
  let fixture: ComponentFixture<Delete_proyectosdeinvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_proyectosdeinvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_proyectosdeinvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
