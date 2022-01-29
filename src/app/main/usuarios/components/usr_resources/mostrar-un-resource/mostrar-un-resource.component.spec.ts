import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarUnResourceComponent } from './mostrar-un-resource.component';

describe('MostrarUnResourceComponent', () => {
  let component: MostrarUnResourceComponent;
  let fixture: ComponentFixture<MostrarUnResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarUnResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarUnResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
