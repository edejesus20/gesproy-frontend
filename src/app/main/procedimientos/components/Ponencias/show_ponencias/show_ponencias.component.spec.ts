/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_ponenciasComponent } from './show_ponencias.component';

describe('Show_ponenciasComponent', () => {
  let component: Show_ponenciasComponent;
  let fixture: ComponentFixture<Show_ponenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_ponenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_ponenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
