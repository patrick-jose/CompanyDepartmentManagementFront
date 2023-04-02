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

  save(record: Company) {
    return this.httpClient.post<Company>(this.API, record);
  }
}
