/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_tareaspendientesComponent } from './delete_tareaspendientes.component';

describe('Delete_tareaspendientesComponent', () => {
  let component: Delete_tareaspendientesComponent;
  let fixture: ComponentFixture<Delete_tareaspendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_tareaspendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_tareaspendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
