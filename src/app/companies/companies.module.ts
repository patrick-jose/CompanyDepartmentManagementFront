import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyFormEditComponent } from './company-form-edit/company-form-edit.component';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyFormComponent,
    CompanyFormEditComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
