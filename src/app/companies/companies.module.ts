import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies/companies.component';


@NgModule({
  declarations: [
    CompaniesComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MatTableModule
  ]
})
export class CompaniesModule { }
