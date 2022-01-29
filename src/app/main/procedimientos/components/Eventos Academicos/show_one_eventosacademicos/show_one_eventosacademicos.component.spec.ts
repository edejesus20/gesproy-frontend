/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_eventosacademicosComponent } from './show_one_eventosacademicos.component';

describe('Show_one_eventosacademicosComponent', () => {
  let component: Show_one_eventosacademicosComponent;
  let fixture: ComponentFixture<Show_one_eventosacademicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_eventosacademicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_eventosacademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
