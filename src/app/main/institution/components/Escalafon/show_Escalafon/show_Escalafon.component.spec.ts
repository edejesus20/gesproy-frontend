/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_EscalafonComponent } from './show_Escalafon.component';

describe('Show_EscalafonComponent', () => {
  let component: Show_EscalafonComponent;
  let fixture: ComponentFixture<Show_EscalafonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_EscalafonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_EscalafonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
