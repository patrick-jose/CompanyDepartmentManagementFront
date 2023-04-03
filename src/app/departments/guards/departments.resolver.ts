import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Company } from 'src/app/companies/model/company';

import { Department } from '../model/department';
import { DepartmentsService } from '../services/departments.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsResolver implements Resolve<Department> {
  constructor(private service: DepartmentsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Department> {
    if (route.params && route.params['id']) {
      return this.service.get(route.params['id']);
    }

    let emptyCompany: Company = {
      id: 0,
      createdBy: '',
      createdDate: new Date(),
      modifiedBy: '',
      modifiedDate: new Date(),
      status: false,
      address: '',
      name: '',
      phone: ''
    };

    let emptyDepartment: Department = {
      id: 0,
      createdBy: '',
      createdDate: new Date(),
      modifiedBy: '',
      modifiedDate: new Date(),
      status: false,
      name: '',
      phone: '',
      description: '',
      company: emptyCompany
    }

    return of(emptyDepartment);
  }
}
