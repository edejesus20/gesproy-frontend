/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_grupodeInvetigacionComponent } from './create_grupodeInvetigacion.component';

describe('Create_grupodeInvetigacionComponent', () => {
  let component: Create_grupodeInvetigacionComponent;
  let fixture: ComponentFixture<Create_grupodeInvetigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_grupodeInvetigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_grupodeInvetigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
