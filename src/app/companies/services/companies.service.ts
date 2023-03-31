import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company } from '../model/company';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private readonly API = '/assets/acompanies.json';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Company[]>(this.API).pipe(delay(5000));
  }
}
