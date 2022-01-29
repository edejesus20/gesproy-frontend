/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_grupodeInvetigacionComponent } from './edit_grupodeInvetigacion.component';

describe('Edit_grupodeInvetigacionComponent', () => {
  let component: Edit_grupodeInvetigacionComponent;
  let fixture: ComponentFixture<Edit_grupodeInvetigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_grupodeInvetigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_grupodeInvetigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
