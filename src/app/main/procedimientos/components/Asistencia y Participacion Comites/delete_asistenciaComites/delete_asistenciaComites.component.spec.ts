/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_asistenciaComitesComponent } from './delete_asistenciaComites.component';

describe('Delete_asistenciaComitesComponent', () => {
  let component: Delete_asistenciaComitesComponent;
  let fixture: ComponentFixture<Delete_asistenciaComitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_asistenciaComitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_asistenciaComitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
