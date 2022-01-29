/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_tareascompletadasComponent } from './show_tareascompletadas.component';

describe('Show_tareascompletadasComponent', () => {
  let component: Show_tareascompletadasComponent;
  let fixture: ComponentFixture<Show_tareascompletadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_tareascompletadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_tareascompletadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
