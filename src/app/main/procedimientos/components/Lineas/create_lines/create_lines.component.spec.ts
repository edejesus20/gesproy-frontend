/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_linesComponent } from './create_lines.component';

describe('Create_linesComponent', () => {
  let component: Create_linesComponent;
  let fixture: ComponentFixture<Create_linesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_linesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_linesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
