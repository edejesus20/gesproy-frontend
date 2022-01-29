/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_educacioncontinuadaComponent } from './create_educacioncontinuada.component';

describe('Create_educacioncontinuadaComponent', () => {
  let component: Create_educacioncontinuadaComponent;
  let fixture: ComponentFixture<Create_educacioncontinuadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_educacioncontinuadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_educacioncontinuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
