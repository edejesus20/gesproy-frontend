/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_Thematic_axisComponent } from './create_Thematic_axis.component';

describe('Create_Thematic_axisComponent', () => {
  let component: Create_Thematic_axisComponent;
  let fixture: ComponentFixture<Create_Thematic_axisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_Thematic_axisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_Thematic_axisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
