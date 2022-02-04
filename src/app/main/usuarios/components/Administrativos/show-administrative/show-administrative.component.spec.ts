/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowAdministrativeComponent } from './show-administrative.component';

describe('ShowAdministrativeComponent', () => {
  let component: ShowAdministrativeComponent;
  let fixture: ComponentFixture<ShowAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
