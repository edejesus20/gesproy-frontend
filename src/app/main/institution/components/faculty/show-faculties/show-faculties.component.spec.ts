import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFacultiesComponent } from './show-faculties.component';

describe('ShowFacultieComponent', () => {
  let component: ShowFacultiesComponent;
  let fixture: ComponentFixture<ShowFacultiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFacultiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFacultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
