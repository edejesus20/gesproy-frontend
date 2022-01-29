/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_educacioncontinuadaComponent } from './show_one_educacioncontinuada.component';

describe('Show_one_educacioncontinuadaComponent', () => {
  let component: Show_one_educacioncontinuadaComponent;
  let fixture: ComponentFixture<Show_one_educacioncontinuadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_educacioncontinuadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_educacioncontinuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
