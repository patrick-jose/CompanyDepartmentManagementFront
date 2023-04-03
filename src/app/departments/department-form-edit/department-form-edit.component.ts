import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Department } from '../model/department';
import { DepartmentsService } from '../services/departments.service';
import { Company } from 'src/app/companies/model/company';

@Component({
  selector: 'app-department-form-edit',
  templateUrl: './department-form-edit.component.html',
  styleUrls: ['./department-form-edit.component.css']
})
export class DepartmentFormEditComponent {
  form: FormGroup;
  progress: boolean;
  isActive: boolean;
  departmentId: number = 0;
  department: Department;
  emptyCompany: Company = {
    id: 0,
    createdBy: '',
    createdDate: new Date(),
    modifiedBy: '',
    modifiedDate: new Date(),
    status: false,
    address: '',
    name: '',
    phone: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: DepartmentsService,
    private snackBar: MatSnackBar,
    private location: Location,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl<string>(''),
      description: new FormControl<string>(''),
      phone: new FormControl<string>(''),
      createdBy: new FormControl<string>(''),
      createdDate: new FormControl<Date>(new Date()),
      modifiedBy: new FormControl<string>(''),
      status: new FormControl<boolean>(true),
      modifiedDate: new FormControl<Date>(new Date()),
      id: new FormControl<number>(0),
      company: new FormControl<Company>(this.emptyCompany)
    })
    this.progress = false;
    this.isActive = true;
    this.department = this.route.snapshot.data['department'];
  }

  ngOnInit(): void {
    this.form.setValue(
      {
        name: this.department.name,
        phone: this.department.phone,
        createdBy: this.department.createdBy,
        createdDate: this.department.createdDate,
        modifiedBy: 'Patrick modificação',
        status: this.department.status,
        modifiedDate: new Date(),
        id: this.department.id,
        description: this.department.description,
        company: this.department.company
      }
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onSubmit() {
    this.progress = true;

    this.form.value.status = this.isActive;
    this.form.value.createdBy = 'Patrick'; // TODO: get user from login
    this.form.value.modifiedBy = 'Patrick'; // TODO: get user from login

    if (this.form.value.name == '') {
      this.snackBar.open('You must enter the name of the department', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else {
      this.service.update(this.form.value)
        .subscribe({
          complete: () => {
            this.progress = false;
            this.snackBar.open('Department updated', 'Close', { duration: 5000 });
            this.onDiscard();
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open('Error on updating department', 'Close', { duration: 5000 });
            this.progress = false;
          }
      });
    }
  }

  onDiscard() {
    this.location.back();
  }
}
