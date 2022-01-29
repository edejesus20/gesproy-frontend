/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Edit_convenioscooperacionComponent } from './edit_convenioscooperacion.component';

describe('Edit_convenioscooperacionComponent', () => {
  let component: Edit_convenioscooperacionComponent;
  let fixture: ComponentFixture<Edit_convenioscooperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_convenioscooperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit_convenioscooperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
