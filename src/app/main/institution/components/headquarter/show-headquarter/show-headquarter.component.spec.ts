import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHeadquarterComponent } from './show-headquarter.component';

describe('ShowHeadquarterComponent', () => {
  let component: ShowHeadquarterComponent;
  let fixture: ComponentFixture<ShowHeadquarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHeadquarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHeadquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
