/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_ponenciasComponent } from './show_one_ponencias.component';

describe('Show_one_ponenciasComponent', () => {
  let component: Show_one_ponenciasComponent;
  let fixture: ComponentFixture<Show_one_ponenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_ponenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_ponenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
