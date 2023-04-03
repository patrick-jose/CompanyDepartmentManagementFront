import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private readonly API = 'api/departments';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Department[]>(this.API);
  }

  get(id: number) {
    return this.httpClient.get<Department>(this.API + '/byId?id=' + id);
  }

  listByCompanyId(index: number) {
    if (Number.isNaN(index))
      index = 0;
    return this.httpClient.get<Department[]>(this.API + '?companyId=' + index);
  }

  save(record: Department) {
    return this.httpClient.post<Department>(this.API, record);
  }

  update(record: Department) {
    return this.httpClient.put<Department>(this.API, record);
  }
}
