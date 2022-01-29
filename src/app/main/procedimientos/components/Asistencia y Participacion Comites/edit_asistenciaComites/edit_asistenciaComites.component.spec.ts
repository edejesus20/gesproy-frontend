/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_asistenciaComitesComponent } from './edit_asistenciaComites.component';

describe('Edit_asistenciaComitesComponent', () => {
  let component: Edit_asistenciaComitesComponent;
  let fixture: ComponentFixture<Edit_asistenciaComitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_asistenciaComitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_asistenciaComitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
