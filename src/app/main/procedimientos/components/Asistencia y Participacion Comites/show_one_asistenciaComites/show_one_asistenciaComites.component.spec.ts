/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_asistenciaComitesComponent } from './show_one_asistenciaComites.component';

describe('Show_one_asistenciaComitesComponent', () => {
  let component: Show_one_asistenciaComitesComponent;
  let fixture: ComponentFixture<Show_one_asistenciaComitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_asistenciaComitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_asistenciaComitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
