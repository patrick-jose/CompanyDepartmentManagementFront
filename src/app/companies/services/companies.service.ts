import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private readonly API = 'api/companies';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Company[]>(this.API);
  }

  get(id: number) {
    return this.httpClient.get<Company>(this.API + '/byId?id=' + id);
  }

  save(record: Company) {
    return this.httpClient.post<Company>(this.API, record);
  }

  update(record: Company) {
    return this.httpClient.put<Company>(this.API, record);
  }
}
