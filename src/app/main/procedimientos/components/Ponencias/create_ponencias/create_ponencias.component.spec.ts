/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_ponenciasComponent } from './create_ponencias.component';

describe('Create_ponenciasComponent', () => {
  let component: Create_ponenciasComponent;
  let fixture: ComponentFixture<Create_ponenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_ponenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_ponenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
