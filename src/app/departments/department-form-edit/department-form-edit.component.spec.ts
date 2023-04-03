import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentFormEditComponent } from './department-form-edit.component';

describe('DepartmentFormEditComponent', () => {
  let component: DepartmentFormEditComponent;
  let fixture: ComponentFixture<DepartmentFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
