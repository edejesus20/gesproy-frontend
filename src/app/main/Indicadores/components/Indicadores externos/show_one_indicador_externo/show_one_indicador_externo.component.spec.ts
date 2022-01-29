/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_indicador_externoComponent } from './show_one_indicador_externo.component';

describe('Show_one_indicador_externoComponent', () => {
  let component: Show_one_indicador_externoComponent;
  let fixture: ComponentFixture<Show_one_indicador_externoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_indicador_externoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_indicador_externoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
