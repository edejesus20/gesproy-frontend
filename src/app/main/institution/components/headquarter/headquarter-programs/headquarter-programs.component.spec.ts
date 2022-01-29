import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadquarterProgramsComponent } from './headquarter-programs.component';

describe('HeadquarterProgramsComponent', () => {
  let component: HeadquarterProgramsComponent;
  let fixture: ComponentFixture<HeadquarterProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadquarterProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadquarterProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
