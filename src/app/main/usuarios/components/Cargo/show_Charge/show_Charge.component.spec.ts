/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_ChargeComponent } from './show_Charge.component';

describe('Show_ChargeComponent', () => {
  let component: Show_ChargeComponent;
  let fixture: ComponentFixture<Show_ChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_ChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_ChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
