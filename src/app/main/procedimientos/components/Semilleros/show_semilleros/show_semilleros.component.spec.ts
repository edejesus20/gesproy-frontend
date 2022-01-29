/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Show_semillerosComponent } from './show_semilleros.component';

describe('Show_semillerosComponent', () => {
  let component: Show_semillerosComponent;
  let fixture: ComponentFixture<Show_semillerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Show_semillerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Show_semillerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
