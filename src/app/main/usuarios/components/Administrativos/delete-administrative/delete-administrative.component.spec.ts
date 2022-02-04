/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeleteAdministrativeComponent } from './delete-administrative.component';

describe('DeleteAdministrativeComponent', () => {
  let component: DeleteAdministrativeComponent;
  let fixture: ComponentFixture<DeleteAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
