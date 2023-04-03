import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Company } from '../model/company';
import { CompaniesService } from '../services/companies.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyResolver implements Resolve<Company> {
  constructor(private service: CompaniesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company> {
    if (route.params && route.params['id']) {
      return this.service.get(route.params['id']);
    }

    let emptyCompany: Company = {
      id: 0,
      createdBy: '',
      createdDate: new Date(),
      modifiedBy: '',
      modifiedDate: new Date(),
      status: false,
      address: '',
      name: '',
      phone: ''
    }

    return of(emptyCompany);
  }
}
