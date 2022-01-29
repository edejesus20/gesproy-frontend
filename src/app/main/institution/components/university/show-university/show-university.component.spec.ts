import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUniversityComponent } from './show-university.component';

describe('ShowUniversityComponent', () => {
  let component: ShowUniversityComponent;
  let fixture: ComponentFixture<ShowUniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
