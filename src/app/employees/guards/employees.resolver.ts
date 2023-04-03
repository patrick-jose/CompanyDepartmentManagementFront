import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from '../model/employee';
import { Department } from 'src/app/departments/model/department';
import { EmployeesService } from '../services/employees.service';
import { Company } from 'src/app/companies/model/company';

@Injectable({
  providedIn: 'root'
})
export class EmployeesResolver implements Resolve<Employee> {
  constructor(private service: EmployeesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> {
    console.log(route.params['id']);

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
      description: '',
      name: '',
      phone: '',
      company: emptyCompany
    };

    let emptyEmployee: Employee = {
      id: 0,
      createdBy: '',
      createdDate: new Date(),
      modifiedBy: '',
      modifiedDate: new Date(),
      status: false,
      name: '',
      email: '',
      age: 0,
      department: emptyDepartment,
      position: '',
      surname: ''
    }

    return of(emptyEmployee);
  }
}
