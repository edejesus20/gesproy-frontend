import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRolResourceComponent } from './asignar-rol-resource.component';

describe('AsignarRolResourceComponent', () => {
  let component: AsignarRolResourceComponent;
  let fixture: ComponentFixture<AsignarRolResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarRolResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRolResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
