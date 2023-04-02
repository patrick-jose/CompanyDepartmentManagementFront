import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { DepartmentsComponent } from '../departments/departments/departments.component';

const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'new', component: CompanyFormComponent },
  { path: 'departments/:companyId', component: DepartmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
