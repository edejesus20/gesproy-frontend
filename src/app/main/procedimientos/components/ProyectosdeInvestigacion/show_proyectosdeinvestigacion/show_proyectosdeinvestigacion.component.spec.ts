/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_proyectosdeinvestigacionComponent } from './show_proyectosdeinvestigacion.component';

describe('Show_proyectosdeinvestigacionComponent', () => {
  let component: Show_proyectosdeinvestigacionComponent;
  let fixture: ComponentFixture<Show_proyectosdeinvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_proyectosdeinvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_proyectosdeinvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
