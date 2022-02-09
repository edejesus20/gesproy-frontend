/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_ocupationComponent } from './create_ocupation.component';

describe('Create_ocupationComponent', () => {
  let component: Create_ocupationComponent;
  let fixture: ComponentFixture<Create_ocupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_ocupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_ocupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
