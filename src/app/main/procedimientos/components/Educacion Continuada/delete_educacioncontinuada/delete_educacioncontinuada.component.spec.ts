/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_educacioncontinuadaComponent } from './delete_educacioncontinuada.component';

describe('Delete_educacioncontinuadaComponent', () => {
  let component: Delete_educacioncontinuadaComponent;
  let fixture: ComponentFixture<Delete_educacioncontinuadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_educacioncontinuadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_educacioncontinuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
