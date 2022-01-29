/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_one_convenioscooperacionComponent } from './show_one_convenioscooperacion.component';

describe('Show_one_convenioscooperacionComponent', () => {
  let component: Show_one_convenioscooperacionComponent;
  let fixture: ComponentFixture<Show_one_convenioscooperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_one_convenioscooperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_one_convenioscooperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
