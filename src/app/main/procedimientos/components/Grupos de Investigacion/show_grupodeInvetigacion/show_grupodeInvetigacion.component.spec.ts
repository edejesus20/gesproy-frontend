/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_grupodeInvetigacionComponent } from './show_grupodeInvetigacion.component';

describe('Show_grupodeInvetigacionComponent', () => {
  let component: Show_grupodeInvetigacionComponent;
  let fixture: ComponentFixture<Show_grupodeInvetigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_grupodeInvetigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_grupodeInvetigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
