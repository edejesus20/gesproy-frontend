/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_pasos_tareasComponent } from './delete_pasos_tareas.component';

describe('Delete_pasos_tareasComponent', () => {
  let component: Delete_pasos_tareasComponent;
  let fixture: ComponentFixture<Delete_pasos_tareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_pasos_tareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_pasos_tareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
