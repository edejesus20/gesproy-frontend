/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_ponenciasComponent } from './delete_ponencias.component';

describe('Delete_ponenciasComponent', () => {
  let component: Delete_ponenciasComponent;
  let fixture: ComponentFixture<Delete_ponenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_ponenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_ponenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
