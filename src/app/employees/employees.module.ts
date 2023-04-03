import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeFormEditComponent } from './employee-form-edit/employee-form-edit.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeFormComponent,
    EmployeeFormEditComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeesModule { }
