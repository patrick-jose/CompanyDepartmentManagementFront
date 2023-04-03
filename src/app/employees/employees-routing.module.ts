import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesResolver } from './guards/employees.resolver';
import { EmployeeFormEditComponent } from './employee-form-edit/employee-form-edit.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'new', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeFormEditComponent, resolve: { employee: EmployeesResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
