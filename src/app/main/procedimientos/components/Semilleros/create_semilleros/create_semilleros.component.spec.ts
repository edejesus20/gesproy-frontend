/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create_semillerosComponent } from './create_semilleros.component';

describe('Create_semillerosComponent', () => {
  let component: Create_semillerosComponent;
  let fixture: ComponentFixture<Create_semillerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create_semillerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create_semillerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
