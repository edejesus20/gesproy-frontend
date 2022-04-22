/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_Knowledge_areaComponent } from './show_one_Knowledge_area.component';

describe('Show_one_Knowledge_areaComponent', () => {
  let component: Show_one_Knowledge_areaComponent;
  let fixture: ComponentFixture<Show_one_Knowledge_areaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_Knowledge_areaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_Knowledge_areaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
