/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_Knowledge_areaComponent } from './create_Knowledge_area.component';

describe('Create_Knowledge_areaComponent', () => {
  let component: Create_Knowledge_areaComponent;
  let fixture: ComponentFixture<Create_Knowledge_areaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_Knowledge_areaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_Knowledge_areaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
