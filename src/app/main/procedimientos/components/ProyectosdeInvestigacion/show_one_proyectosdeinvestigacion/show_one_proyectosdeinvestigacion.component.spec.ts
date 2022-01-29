/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_proyectosdeinvestigacionComponent } from './show_one_proyectosdeinvestigacion.component';

describe('Show_one_proyectosdeinvestigacionComponent', () => {
  let component: Show_one_proyectosdeinvestigacionComponent;
  let fixture: ComponentFixture<Show_one_proyectosdeinvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_proyectosdeinvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_proyectosdeinvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
