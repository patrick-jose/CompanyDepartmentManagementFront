import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Company } from 'src/app/companies/model/company';
import { Department } from 'src/app/departments/model/department';
import { DepartmentsService } from 'src/app/departments/services/departments.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Employee } from '../model/employee';
import { EmployeesService } from '../services/employees.service';
import { DepartmentEmployee } from '../model/departmentEmployee';
import { Location } from '@angular/common';
import { CompaniesService } from 'src/app/companies/services/companies.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  form: FormGroup;
  selectedDepartment: string;
  departments$: Observable<Department[]>;
  departments: Department[];
  progress: boolean;
  selectedCompany: string;
  companies$: Observable<Company[]>;
  companies: Company[];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private departmentsService: DepartmentsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private service: EmployeesService,
    private companiesService: CompaniesService) {
    this.form = this.formBuilder.group({
      name: [null],
      surname: [null],
      position: [null],
      email: [null],
      age: [null]
    });
    this.selectedDepartment = '';
    this.selectedCompany = '';

    this.companies$ = new Observable;
    this.companies = [];
    this.departments$ = new Observable;
    this.departments = [];
    this.progress = false;
  }

  ngOnInit(): void {
    this.companies$ = this.companiesService.list().pipe(
      catchError(error => {
        this.onError('Error on loading companies');
        return of([]);
      })
    );

    this.companies$.subscribe(result => this.companies = result);
  }

  onCompanyChange() {
    this.departments$ = this.departmentsService.listByCompanyId(+this.selectedCompany).pipe(
      catchError(error => {
        this.onError('Error on loading departments');
        return of([]);
      })
    );

    this.departments$.subscribe(result => this.departments = result);
  }

  onSubmit() {
    let company: Company = {
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

    let department: Department = {
      id: +this.selectedDepartment,
      createdBy: '',
      createdDate: new Date(),
      modifiedBy: '',
      modifiedDate: new Date(),
      status: false,
      name: '',
      phone: '',
      description: '',
      company: company
    };

    let employee: Employee = {
      id: 0,
      createdBy: 'Patrick',
      createdDate: new Date(),
      modifiedBy: 'Patrick',
      modifiedDate: new Date(),
      status: true,
      name: this.form.value.name,
      department: department,
      age: this.form.value.age,
      email: this.form.value.email,
      position: this.form.value.position,
      surname: this.form.value.surname
    }

    if (this.form.value.name == null || this.form.value.name == '') {
      this.snackBar.open('You must enter the name of the employee', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else if (this.selectedDepartment == null || this.selectedDepartment == '') {
      this.snackBar.open('You must choose the department', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else if (this.form.value.surname == null || this.form.value.surname == '') {
      this.snackBar.open('You must enter the surname of the employee', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else {

      let departmentEmployee: DepartmentEmployee = {
        employee: employee,
        department: department
      }

      this.service.save(departmentEmployee)
        .subscribe({
          complete: () => {
            this.progress = false;
            this.snackBar.open('Employee added', 'Close', { duration: 5000 });
            this.onDiscard();
          },
          error: error => {
            this.snackBar.open('Error on saving employee', 'Close', { duration: 5000 });
            this.progress = false;
          },
        });
    }
  }

  onDiscard() {
    this.location.back();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
