/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_RelacionesComponent } from './create_Relaciones.component';

describe('Create_RelacionesComponent', () => {
  let component: Create_RelacionesComponent;
  let fixture: ComponentFixture<Create_RelacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_RelacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_RelacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
