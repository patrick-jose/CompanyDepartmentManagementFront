import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentsComponent } from '../departments/departments/departments.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormEditComponent } from './company-form-edit/company-form-edit.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyResolver } from '../companies/guards/company.resolver';

const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'new', component: CompanyFormComponent },
  { path: 'edit/:id', component: CompanyFormEditComponent, resolve: { company: CompanyResolver} },
  { path: 'departments/:companyId', component: DepartmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
