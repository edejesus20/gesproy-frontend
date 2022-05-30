/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_notificationComponent } from './show_notification.component';

describe('Show_notificationComponent', () => {
  let component: Show_notificationComponent;
  let fixture: ComponentFixture<Show_notificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_notificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_notificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
