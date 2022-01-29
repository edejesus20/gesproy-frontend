/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_tareaspendientesComponent } from './show_tareaspendientes.component';

describe('Show_tareaspendientesComponent', () => {
  let component: Show_tareaspendientesComponent;
  let fixture: ComponentFixture<Show_tareaspendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_tareaspendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_tareaspendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
