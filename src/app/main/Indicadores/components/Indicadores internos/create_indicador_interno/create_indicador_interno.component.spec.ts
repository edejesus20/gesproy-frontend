/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_indicador_internoComponent } from './create_indicador_interno.component';

describe('Create_indicador_internoComponent', () => {
  let component: Create_indicador_internoComponent;
  let fixture: ComponentFixture<Create_indicador_internoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_indicador_internoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_indicador_internoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
