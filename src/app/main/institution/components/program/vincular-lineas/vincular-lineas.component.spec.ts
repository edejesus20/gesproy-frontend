/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VincularLineasComponent } from './vincular-lineas.component';

describe('VincularLineasComponent', () => {
  let component: VincularLineasComponent;
  let fixture: ComponentFixture<VincularLineasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VincularLineasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularLineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
