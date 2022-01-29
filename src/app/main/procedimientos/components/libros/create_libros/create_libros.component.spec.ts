/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_librosComponent } from './create_libros.component';

describe('Create_librosComponent', () => {
  let component: Create_librosComponent;
  let fixture: ComponentFixture<Create_librosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_librosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_librosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
