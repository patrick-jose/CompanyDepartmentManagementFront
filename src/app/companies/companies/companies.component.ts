import { Component } from '@angular/core';
import { Company } from '../model/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {

  companies: Company[] = [
    {
      id: 1,
      name: 'teste',
      address: 'teste',
      createdBy: 'teste',
      createdDate: new Date(),
      modifiedBy: 'teste',
      phone: 'teste',
      status: true
    }
  ];
  displayedColumns = ['name', 'createdBy', 'createdDate', 'modifiedBy', 'status', 'address', 'phone'];

  constructor() {
  }

}
