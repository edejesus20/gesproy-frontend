/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_ProjectModalityComponent } from './create_ProjectModality.component';

describe('Create_ProjectModalityComponent', () => {
  let component: Create_ProjectModalityComponent;
  let fixture: ComponentFixture<Create_ProjectModalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_ProjectModalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_ProjectModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
