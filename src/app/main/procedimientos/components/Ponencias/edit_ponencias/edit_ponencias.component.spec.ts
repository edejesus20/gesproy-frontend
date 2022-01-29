/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_ponenciasComponent } from './edit_ponencias.component';

describe('Edit_ponenciasComponent', () => {
  let component: Edit_ponenciasComponent;
  let fixture: ComponentFixture<Edit_ponenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_ponenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_ponenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
