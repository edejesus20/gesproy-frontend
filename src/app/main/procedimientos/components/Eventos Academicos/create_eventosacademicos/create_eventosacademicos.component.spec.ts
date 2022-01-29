/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_eventosacademicosComponent } from './create_eventosacademicos.component';

describe('Create_eventosacademicosComponent', () => {
  let component: Create_eventosacademicosComponent;
  let fixture: ComponentFixture<Create_eventosacademicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_eventosacademicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_eventosacademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
