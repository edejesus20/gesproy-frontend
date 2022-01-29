/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_indicador_internoComponent } from './edit_indicador_interno.component';

describe('Edit_indicador_internoComponent', () => {
  let component: Edit_indicador_internoComponent;
  let fixture: ComponentFixture<Edit_indicador_internoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_indicador_internoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_indicador_internoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
