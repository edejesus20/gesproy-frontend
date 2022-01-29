/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_tareasenprocesoComponent } from './show_one_tareasenproceso.component';

describe('Show_one_tareasenprocesoComponent', () => {
  let component: Show_one_tareasenprocesoComponent;
  let fixture: ComponentFixture<Show_one_tareasenprocesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_tareasenprocesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_tareasenprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
