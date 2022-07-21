/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_ProjectModalityComponent } from './show_ProjectModality.component';

describe('Show_ProjectModalityComponent', () => {
  let component: Show_ProjectModalityComponent;
  let fixture: ComponentFixture<Show_ProjectModalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_ProjectModalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_ProjectModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
