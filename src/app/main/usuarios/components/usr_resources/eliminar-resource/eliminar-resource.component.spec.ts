import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarResourceComponent } from './eliminar-resource.component';

describe('EliminarResourceComponent', () => {
  let component: EliminarResourceComponent;
  let fixture: ComponentFixture<EliminarResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
