/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delet_convenioscooperacionComponent } from './delet_convenioscooperacion.component';

describe('Delet_convenioscooperacionComponent', () => {
  let component: Delet_convenioscooperacionComponent;
  let fixture: ComponentFixture<Delet_convenioscooperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delet_convenioscooperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delet_convenioscooperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
