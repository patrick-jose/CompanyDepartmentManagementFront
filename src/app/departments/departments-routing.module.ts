import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from '../employees/employees/employees.component';

const routes: Routes = [
  { path: '', component: DepartmentsComponent },
  { path: 'new', component: DepartmentFormComponent },
  { path: 'employees', component: EmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
