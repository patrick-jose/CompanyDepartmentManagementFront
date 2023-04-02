import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Department } from '../model/department';
import { DepartmentsService } from '../services/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnDestroy {
  departments$: Observable<Department[]>;
  companyId: number = 0;
  sub: any;
  displayedColumns = ['name', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', 'status', 'description', 'phone', 'actions'];

  constructor(
    private departmentsService: DepartmentsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) {
        this.sub = this.route.params.subscribe(params => {
        this.companyId = +params['companyId'];
      });

      if (this.companyId == 0 || this.companyId == null) {
        this.departments$ = this.departmentsService.list().pipe(
          catchError(error => {
            this.onError('Error on loading departments');
            return of([]);
          })
        );
      }
      else {
        this.departments$ = this.departmentsService.listByCompanyId(this.companyId).pipe(
          catchError(error => {
            this.onError('Error on loading departments');
            return of([]);
          })
        );
      }
    }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['departments/new']);
  }

  showEmployees() {
    this.router.navigate(['departments/employees']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
