import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private readonly API = 'http://localhost:8080/api/companies';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Company[]>(this.API);
  }
}
