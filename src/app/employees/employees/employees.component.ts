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
  departmentId: number = 0;
  sub: any;
  readonly displayedColumns = ['name', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', 'status', 'age', 'email', 'position', 'surname', 'actions'];

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) {
        this.sub = this.route.params.subscribe(params => {
        this.departmentId = +params['departmentId'];
      });

      if (this.departmentId == 0 || this.departmentId == null) {
        this.employees$ = this.employeesService.list().pipe(
          catchError(error => {
            this.onError('Error on loading employees');
            return of([]);
          })
        );
      }
      else {
        this.employees$ = this.employeesService.listByDepartmentId(this.departmentId).pipe(
          catchError(error => {
            this.onError('Error on loading employees');
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
    this.router.navigate(['employees/new']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editEmployee(employee: Employee) {
    this.router.navigate(['employees/edit', employee.id]);
  }
}
