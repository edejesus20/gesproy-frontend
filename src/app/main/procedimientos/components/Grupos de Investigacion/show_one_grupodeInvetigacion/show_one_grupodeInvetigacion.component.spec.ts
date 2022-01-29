/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_grupodeInvetigacionComponent } from './show_one_grupodeInvetigacion.component';

describe('Show_one_grupodeInvetigacionComponent', () => {
  let component: Show_one_grupodeInvetigacionComponent;
  let fixture: ComponentFixture<Show_one_grupodeInvetigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_grupodeInvetigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_grupodeInvetigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
