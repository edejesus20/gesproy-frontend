/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_Knowledge_areaComponent } from './edit_Knowledge_area.component';

describe('Edit_Knowledge_areaComponent', () => {
  let component: Edit_Knowledge_areaComponent;
  let fixture: ComponentFixture<Edit_Knowledge_areaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_Knowledge_areaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_Knowledge_areaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
