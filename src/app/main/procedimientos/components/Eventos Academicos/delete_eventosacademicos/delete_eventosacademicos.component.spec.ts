/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_eventosacademicosComponent } from './delete_eventosacademicos.component';

describe('Delete_eventosacademicosComponent', () => {
  let component: Delete_eventosacademicosComponent;
  let fixture: ComponentFixture<Delete_eventosacademicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_eventosacademicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_eventosacademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
