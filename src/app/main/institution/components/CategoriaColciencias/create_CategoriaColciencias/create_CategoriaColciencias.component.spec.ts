/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_CategoriaColcienciasComponent } from './create_CategoriaColciencias.component';

describe('Create_CategoriaColcienciasComponent', () => {
  let component: Create_CategoriaColcienciasComponent;
  let fixture: ComponentFixture<Create_CategoriaColcienciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_CategoriaColcienciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_CategoriaColcienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
