/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_indicador_internoComponent } from './show_indicador_interno.component';

describe('Show_indicador_internoComponent', () => {
  let component: Show_indicador_internoComponent;
  let fixture: ComponentFixture<Show_indicador_internoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_indicador_internoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_indicador_internoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
