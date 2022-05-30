/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_notificationComponent } from './create_notification.component';

describe('Create_notificationComponent', () => {
  let component: Create_notificationComponent;
  let fixture: ComponentFixture<Create_notificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_notificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_notificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
