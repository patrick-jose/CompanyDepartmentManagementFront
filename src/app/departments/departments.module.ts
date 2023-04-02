import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentFormComponent } from './department-form/department-form.component';


@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentFormComponent
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
