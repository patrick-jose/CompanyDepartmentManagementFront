import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly API = 'api/companies';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Employee[]>(this.API);
  }
}
