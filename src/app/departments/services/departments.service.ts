import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private readonly API = 'api/companies';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Department[]>(this.API);
  }
}
