/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_eventosacademicosComponent } from './show_eventosacademicos.component';

describe('Show_eventosacademicosComponent', () => {
  let component: Show_eventosacademicosComponent;
  let fixture: ComponentFixture<Show_eventosacademicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_eventosacademicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_eventosacademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
