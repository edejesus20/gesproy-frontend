/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_proyectodeextensionComponent } from './show_one_proyectodeextension.component';

describe('Show_one_proyectodeextensionComponent', () => {
  let component: Show_one_proyectodeextensionComponent;
  let fixture: ComponentFixture<Show_one_proyectodeextensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_proyectodeextensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_proyectodeextensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
