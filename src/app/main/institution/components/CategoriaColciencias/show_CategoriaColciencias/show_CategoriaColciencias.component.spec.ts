/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_CategoriaColcienciasComponent } from './show_CategoriaColciencias.component';

describe('Show_CategoriaColcienciasComponent', () => {
  let component: Show_CategoriaColcienciasComponent;
  let fixture: ComponentFixture<Show_CategoriaColcienciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_CategoriaColcienciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_CategoriaColcienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
