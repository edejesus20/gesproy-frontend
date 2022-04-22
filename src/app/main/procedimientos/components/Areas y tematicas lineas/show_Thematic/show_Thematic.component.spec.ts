/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_ThematicComponent } from './show_Thematic.component';

describe('Show_ThematicComponent', () => {
  let component: Show_ThematicComponent;
  let fixture: ComponentFixture<Show_ThematicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_ThematicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_ThematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
