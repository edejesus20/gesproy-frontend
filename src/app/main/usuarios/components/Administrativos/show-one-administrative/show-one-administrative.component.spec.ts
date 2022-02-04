/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowOneAdministrativeComponent } from './show-one-administrative.component';

describe('ShowOneAdministrativeComponent', () => {
  let component: ShowOneAdministrativeComponent;
  let fixture: ComponentFixture<ShowOneAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOneAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOneAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
