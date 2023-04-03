import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentFormEditComponent } from './department-form-edit/department-form-edit.component';


@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentFormComponent,
    DepartmentFormEditComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DepartmentsModule { }
