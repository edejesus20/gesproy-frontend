/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_CategoriaColcienciasComponent } from './delete_CategoriaColciencias.component';

describe('Delete_CategoriaColcienciasComponent', () => {
  let component: Delete_CategoriaColcienciasComponent;
  let fixture: ComponentFixture<Delete_CategoriaColcienciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_CategoriaColcienciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_CategoriaColcienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
