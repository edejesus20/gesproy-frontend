/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_Charge_bondingComponent } from './create_Charge_bonding.component';

describe('Create_Charge_bondingComponent', () => {
  let component: Create_Charge_bondingComponent;
  let fixture: ComponentFixture<Create_Charge_bondingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_Charge_bondingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_Charge_bondingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
