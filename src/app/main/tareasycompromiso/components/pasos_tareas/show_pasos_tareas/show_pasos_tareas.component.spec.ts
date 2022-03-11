/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_pasos_tareasComponent } from './show_pasos_tareas.component';

describe('Show_pasos_tareasComponent', () => {
  let component: Show_pasos_tareasComponent;
  let fixture: ComponentFixture<Show_pasos_tareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_pasos_tareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_pasos_tareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
