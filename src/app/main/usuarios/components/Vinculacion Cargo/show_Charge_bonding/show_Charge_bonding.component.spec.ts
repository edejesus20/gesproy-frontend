/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_Charge_bondingComponent } from './show_Charge_bonding.component';

describe('Show_Charge_bondingComponent', () => {
  let component: Show_Charge_bondingComponent;
  let fixture: ComponentFixture<Show_Charge_bondingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_Charge_bondingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_Charge_bondingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
