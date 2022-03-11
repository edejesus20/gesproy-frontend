/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_tipo_tareasComponent } from './edit_tipo_tareas.component';

describe('Edit_tipo_tareasComponent', () => {
  let component: Edit_tipo_tareasComponent;
  let fixture: ComponentFixture<Edit_tipo_tareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_tipo_tareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_tipo_tareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
