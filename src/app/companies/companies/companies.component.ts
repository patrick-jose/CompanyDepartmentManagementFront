import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Company } from '../model/company';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {

  companies$: Observable<Company[]>;
  displayedColumns = ['name', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', 'status', 'address', 'phone'];

  constructor(
    private companiesService: CompaniesService,
    public dialog: MatDialog
    ) {
      this.companies$ = this.companiesService.list().pipe(
        catchError(error => {
          this.onError('Error on loading companies');
          return of([]);
        })
      );
    }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
