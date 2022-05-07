/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_ChargeComponent } from './create_Charge.component';

describe('Create_ChargeComponent', () => {
  let component: Create_ChargeComponent;
  let fixture: ComponentFixture<Create_ChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_ChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_ChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
