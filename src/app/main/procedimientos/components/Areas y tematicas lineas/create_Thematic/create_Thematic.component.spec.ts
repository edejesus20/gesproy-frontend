/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_ThematicComponent } from './create_Thematic.component';

describe('Create_ThematicComponent', () => {
  let component: Create_ThematicComponent;
  let fixture: ComponentFixture<Create_ThematicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_ThematicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_ThematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
