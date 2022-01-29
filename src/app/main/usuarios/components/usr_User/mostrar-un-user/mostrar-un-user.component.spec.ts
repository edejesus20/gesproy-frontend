import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarUnUserComponent } from './mostrar-un-user.component';

describe('MostrarUnUserComponent', () => {
  let component: MostrarUnUserComponent;
  let fixture: ComponentFixture<MostrarUnUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarUnUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarUnUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
