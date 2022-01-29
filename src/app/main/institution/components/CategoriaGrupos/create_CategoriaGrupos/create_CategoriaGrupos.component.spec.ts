/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_CategoriaGruposComponent } from './create_CategoriaGrupos.component';

describe('Create_CategoriaGruposComponent', () => {
  let component: Create_CategoriaGruposComponent;
  let fixture: ComponentFixture<Create_CategoriaGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_CategoriaGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_CategoriaGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
