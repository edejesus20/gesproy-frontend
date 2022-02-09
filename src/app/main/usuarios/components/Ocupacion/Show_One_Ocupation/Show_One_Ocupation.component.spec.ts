/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_One_OcupationComponent } from './Show_One_Ocupation.component';

describe('Show_One_OcupationComponent', () => {
  let component: Show_One_OcupationComponent;
  let fixture: ComponentFixture<Show_One_OcupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_One_OcupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_One_OcupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
