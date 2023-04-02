import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../model/employee';
import { Department } from 'src/app/departments/model/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly API = 'api/employees';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Employee[]>(this.API);
  }

  save(record: Employee, department: Department) {
    return this.httpClient.post<Employee>(this.API, {record, department});
  }
}
