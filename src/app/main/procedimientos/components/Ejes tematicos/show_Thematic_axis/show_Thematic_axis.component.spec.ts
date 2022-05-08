/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_Thematic_axisComponent } from './show_Thematic_axis.component';

describe('Show_Thematic_axisComponent', () => {
  let component: Show_Thematic_axisComponent;
  let fixture: ComponentFixture<Show_Thematic_axisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_Thematic_axisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_Thematic_axisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
