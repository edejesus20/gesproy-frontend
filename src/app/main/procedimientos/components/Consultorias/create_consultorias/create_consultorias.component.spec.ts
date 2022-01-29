/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_consultoriasComponent } from './create_consultorias.component';

describe('Create_consultoriasComponent', () => {
  let component: Create_consultoriasComponent;
  let fixture: ComponentFixture<Create_consultoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_consultoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_consultoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
