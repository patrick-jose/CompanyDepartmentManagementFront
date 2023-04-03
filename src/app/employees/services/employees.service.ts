import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DepartmentEmployee } from '../model/departmentEmployee';
import { DepartmentEmployeeDTO } from '../model/departmentEmployeeDTO';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly API = 'api/employees';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Employee[]>(this.API);
  }

  get(id: number) {
    return this.httpClient.get<Employee>(this.API + '/byId?id=' + id);
  }

  listByDepartmentId(index: number) {
    if (Number.isNaN(index))
      index = 0;
    return this.httpClient.get<Employee[]>(this.API + '?departmentId=' + index);
  }

  save(record: DepartmentEmployeeDTO) {
    return this.httpClient.post<Employee>(this.API, record);
  }

  updateDepartmentEmployee(record: DepartmentEmployee) {
    return this.httpClient.put<DepartmentEmployeeDTO>(this.API + '/department', record);
  }

  update(record: Employee) {
    return this.httpClient.put<Employee>(this.API, record);
  }
}
