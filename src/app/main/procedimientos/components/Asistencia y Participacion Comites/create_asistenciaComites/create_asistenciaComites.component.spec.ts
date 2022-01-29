/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_asistenciaComitesComponent } from './create_asistenciaComites.component';

describe('Create_asistenciaComitesComponent', () => {
  let component: Create_asistenciaComitesComponent;
  let fixture: ComponentFixture<Create_asistenciaComitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_asistenciaComitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_asistenciaComitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
