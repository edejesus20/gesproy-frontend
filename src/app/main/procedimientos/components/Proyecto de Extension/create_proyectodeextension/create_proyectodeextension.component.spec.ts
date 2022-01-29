/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_proyectodeextensionComponent } from './create_proyectodeextension.component';

describe('Create_proyectodeextensionComponent', () => {
  let component: Create_proyectodeextensionComponent;
  let fixture: ComponentFixture<Create_proyectodeextensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_proyectodeextensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_proyectodeextensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
