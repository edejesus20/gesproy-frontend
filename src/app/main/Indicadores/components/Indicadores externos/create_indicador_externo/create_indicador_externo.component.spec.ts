/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_indicador_externoComponent } from './create_indicador_externo.component';

describe('Create_indicador_externoComponent', () => {
  let component: Create_indicador_externoComponent;
  let fixture: ComponentFixture<Create_indicador_externoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_indicador_externoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_indicador_externoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
