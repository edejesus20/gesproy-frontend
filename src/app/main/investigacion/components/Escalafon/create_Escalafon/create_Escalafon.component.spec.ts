/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_EscalafonComponent } from './create_Escalafon.component';

describe('Create_EscalafonComponent', () => {
  let component: Create_EscalafonComponent;
  let fixture: ComponentFixture<Create_EscalafonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_EscalafonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_EscalafonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
