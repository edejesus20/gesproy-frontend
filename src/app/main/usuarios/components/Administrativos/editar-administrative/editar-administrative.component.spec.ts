/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarAdministrativeComponent } from './editar-administrative.component';

describe('EditarAdministrativeComponent', () => {
  let component: EditarAdministrativeComponent;
  let fixture: ComponentFixture<EditarAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
