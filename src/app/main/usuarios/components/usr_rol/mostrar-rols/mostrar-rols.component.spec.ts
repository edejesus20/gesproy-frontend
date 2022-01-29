import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRolsComponent } from './mostrar-rols.component';

describe('MostrarRolsComponent', () => {
  let component: MostrarRolsComponent;
  let fixture: ComponentFixture<MostrarRolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarRolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarRolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
