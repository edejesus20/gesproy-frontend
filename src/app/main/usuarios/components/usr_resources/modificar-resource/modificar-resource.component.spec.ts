import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarResourceComponent } from './modificar-resource.component';

describe('ModificarResourceComponent', () => {
  let component: ModificarResourceComponent;
  let fixture: ComponentFixture<ModificarResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
