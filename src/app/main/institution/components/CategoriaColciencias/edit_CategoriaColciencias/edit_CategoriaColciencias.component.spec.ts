/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_CategoriaColcienciasComponent } from './edit_CategoriaColciencias.component';

describe('Edit_CategoriaColcienciasComponent', () => {
  let component: Edit_CategoriaColcienciasComponent;
  let fixture: ComponentFixture<Edit_CategoriaColcienciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_CategoriaColcienciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_CategoriaColcienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
