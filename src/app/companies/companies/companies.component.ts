import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Company } from '../model/company';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies$: Observable<Company[]>;
  readonly displayedColumns = ['name', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', 'status', 'address', 'phone', 'actions'];
  @Output() edit = new EventEmitter(false);

  constructor(
    private companiesService: CompaniesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
      this.companies$ = new Observable;
    }

  ngOnInit(): void {
    this.companies$ = this.companiesService.list().pipe(
      catchError(error => {
        this.onError('Error on loading companies');
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  showDepartments(companyId: number) {
    this.router.navigate(['departments', companyId], { relativeTo: this.route });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  editCompany(company: Company) {
    this.router.navigate(['edit', company.id], { relativeTo: this.route });
  }
}
