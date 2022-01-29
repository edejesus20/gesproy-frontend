/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_grupodeInvetigacionComponent } from './delete_grupodeInvetigacion.component';

describe('Delete_grupodeInvetigacionComponent', () => {
  let component: Delete_grupodeInvetigacionComponent;
  let fixture: ComponentFixture<Delete_grupodeInvetigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_grupodeInvetigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_grupodeInvetigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
