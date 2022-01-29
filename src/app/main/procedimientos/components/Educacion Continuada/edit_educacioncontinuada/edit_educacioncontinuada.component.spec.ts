/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_educacioncontinuadaComponent } from './edit_educacioncontinuada.component';

describe('Edit_educacioncontinuadaComponent', () => {
  let component: Edit_educacioncontinuadaComponent;
  let fixture: ComponentFixture<Edit_educacioncontinuadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_educacioncontinuadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_educacioncontinuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
