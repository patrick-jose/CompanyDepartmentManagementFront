import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../model/employee';
import { DepartmentEmployee } from '../model/departmentEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly API = 'api/employees';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Employee[]>(this.API);
  }

  listByDepartmentId(index: number) {
    if (Number.isNaN(index))
      index = 0;
    return this.httpClient.get<Employee[]>(this.API + '?departmentId=' + index);
  }

  save(record: DepartmentEmployee) {
    return this.httpClient.post<Employee>(this.API, record);
  }
}
