/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_CategoriaColcienciasComponent } from './show_one_CategoriaColciencias.component';

describe('Show_one_CategoriaColcienciasComponent', () => {
  let component: Show_one_CategoriaColcienciasComponent;
  let fixture: ComponentFixture<Show_one_CategoriaColcienciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_CategoriaColcienciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_CategoriaColcienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
