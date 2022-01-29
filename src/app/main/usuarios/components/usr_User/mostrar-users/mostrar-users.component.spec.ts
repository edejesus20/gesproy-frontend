import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarUsersComponent } from './mostrar-users.component';

describe('MostrarUsersComponent', () => {
  let component: MostrarUsersComponent;
  let fixture: ComponentFixture<MostrarUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
