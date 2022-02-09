/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_genderComponent } from './create_gender.component';

describe('Create_genderComponent', () => {
  let component: Create_genderComponent;
  let fixture: ComponentFixture<Create_genderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_genderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_genderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
