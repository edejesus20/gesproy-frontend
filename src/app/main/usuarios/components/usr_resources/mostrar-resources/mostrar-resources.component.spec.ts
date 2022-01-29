import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarResourcesComponent } from './mostrar-resources.component';

describe('MostrarResourcesComponent', () => {
  let component: MostrarResourcesComponent;
  let fixture: ComponentFixture<MostrarResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
