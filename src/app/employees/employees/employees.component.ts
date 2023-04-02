import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Employee } from '../model/employee';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees$: Observable<Employee[]>;
  displayedColumns = ['surname', 'name', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', 'status', 'age', 'email', 'position', 'actions'];

  constructor(
    private employeesService: EmployeesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.employees$ = this.employeesService.list().pipe(
        catchError(error => {
          this.onError('Error on loading departments');
          return of([]);
        })
      );
    }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['employees/new']);
  }

  showDepartments() {
    this.router.navigate(['departments'], { relativeTo: this.route });
  }
}
