/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete_Knowledge_areaComponent } from './delete_Knowledge_area.component';

describe('Delete_Knowledge_areaComponent', () => {
  let component: Delete_Knowledge_areaComponent;
  let fixture: ComponentFixture<Delete_Knowledge_areaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete_Knowledge_areaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete_Knowledge_areaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
