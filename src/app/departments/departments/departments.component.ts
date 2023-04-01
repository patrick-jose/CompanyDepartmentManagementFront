import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Department } from '../model/department';
import { DepartmentsService } from '../services/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  departments$: Observable<Department[]>;
  displayedColumns = ['name', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', 'status', 'description', 'phone'];

  constructor(
    private departmentsService: DepartmentsService,
    public dialog: MatDialog
    ) {
      this.departments$ = this.departmentsService.list().pipe(
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
}
