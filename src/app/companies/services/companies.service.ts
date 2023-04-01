import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private readonly API = '/assets/companies.json';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Company[]>(this.API);
  }
}
