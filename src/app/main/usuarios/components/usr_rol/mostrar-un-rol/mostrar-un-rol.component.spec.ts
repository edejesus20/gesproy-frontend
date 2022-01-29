import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarUnRolComponent } from './mostrar-un-rol.component';

describe('MostrarUnRolComponent', () => {
  let component: MostrarUnRolComponent;
  let fixture: ComponentFixture<MostrarUnRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarUnRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarUnRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
