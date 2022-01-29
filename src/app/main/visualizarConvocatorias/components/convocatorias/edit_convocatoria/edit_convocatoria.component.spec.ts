/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_convocatoriaComponent } from './edit_convocatoria.component';

describe('Edit_convocatoriaComponent', () => {
  let component: Edit_convocatoriaComponent;
  let fixture: ComponentFixture<Edit_convocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_convocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_convocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
