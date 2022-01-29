/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_convenioscooperacionComponent } from './show_convenioscooperacion.component';

describe('Show_convenioscooperacionComponent', () => {
  let component: Show_convenioscooperacionComponent;
  let fixture: ComponentFixture<Show_convenioscooperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_convenioscooperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_convenioscooperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
