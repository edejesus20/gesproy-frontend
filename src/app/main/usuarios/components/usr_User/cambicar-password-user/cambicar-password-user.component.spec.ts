import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambicarPasswordUserComponent } from './cambicar-password-user.component';

describe('CambicarPasswordUserComponent', () => {
  let component: CambicarPasswordUserComponent;
  let fixture: ComponentFixture<CambicarPasswordUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambicarPasswordUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambicarPasswordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
