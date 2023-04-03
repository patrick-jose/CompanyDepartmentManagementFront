import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesComponent } from '../employees/employees/employees.component';
import { DepartmentFormEditComponent } from './department-form-edit/department-form-edit.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentsResolver } from './guards/departments.resolver';

const routes: Routes = [
  { path: '', component: DepartmentsComponent },
  { path: 'new', component: DepartmentFormComponent },
  { path: 'edit/:id', component: DepartmentFormEditComponent, resolve: { department: DepartmentsResolver} },
  { path: 'employees/:departmentId', component: EmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
