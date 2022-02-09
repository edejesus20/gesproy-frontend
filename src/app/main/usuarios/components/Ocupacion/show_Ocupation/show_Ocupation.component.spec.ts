/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_OcupationComponent } from './show_Ocupation.component';

describe('Show_OcupationComponent', () => {
  let component: Show_OcupationComponent;
  let fixture: ComponentFixture<Show_OcupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_OcupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_OcupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
