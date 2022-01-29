import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRolUserComponent } from './asignar-rol-user.component';

describe('AsignarRolUserComponent', () => {
  let component: AsignarRolUserComponent;
  let fixture: ComponentFixture<AsignarRolUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarRolUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRolUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
