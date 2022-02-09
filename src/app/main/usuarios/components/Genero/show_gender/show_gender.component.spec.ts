/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_genderComponent } from './show_gender.component';

describe('Show_genderComponent', () => {
  let component: Show_genderComponent;
  let fixture: ComponentFixture<Show_genderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_genderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_genderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
