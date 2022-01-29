/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_educacioncontinuadaComponent } from './show_educacioncontinuada.component';

describe('Show_educacioncontinuadaComponent', () => {
  let component: Show_educacioncontinuadaComponent;
  let fixture: ComponentFixture<Show_educacioncontinuadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_educacioncontinuadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_educacioncontinuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
