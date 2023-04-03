import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { Company } from 'src/app/companies/model/company';
import { CompaniesService } from 'src/app/companies/services/companies.service';
import { Department } from 'src/app/departments/model/department';
import { DepartmentsService } from 'src/app/departments/services/departments.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Employee } from '../model/employee';
import { EmployeesService } from '../services/employees.service';
import { ActivatedRoute } from '@angular/router';
import { DepartmentEmployee } from '../model/departmentEmployee';

@Component({
  selector: 'app-employee-form-edit',
  templateUrl: './employee-form-edit.component.html',
  styleUrls: ['./employee-form-edit.component.css']
})
export class EmployeeFormEditComponent {
  form: FormGroup;
  selectedDepartment: string;
  departments$: Observable<Department[]>;
  departments: Department[];
  progress: boolean;
  selectedCompany: string;
  companies$: Observable<Company[]>;
  isActive: boolean;
  employeeId: number = 0;
  companies: Company[];
  employee: Employee;
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
  emptyDepartment: Department = {
    id: 0,
    createdBy: '',
    createdDate: new Date(),
    modifiedBy: '',
    modifiedDate: new Date(),
    status: false,
    description: '',
    name: '',
    phone: '',
    company: this.emptyCompany
  };

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private departmentsService: DepartmentsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private service: EmployeesService,
    private companiesService: CompaniesService,
    private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      name: new FormControl<string>(''),
      surname: new FormControl<string>(''),
      position: new FormControl<string>(''),
      email: new FormControl<string>(''),
      age: new FormControl<string>(''),
      createdBy: new FormControl<string>(''),
      createdDate: new FormControl<Date>(new Date()),
      status: new FormControl<boolean>(true),
      id: new FormControl<number>(0),
      modifiedBy: new FormControl<string>(''),
      modifiedDate: new FormControl<Date>(new Date())
    });
    this.selectedDepartment = '';
    this.selectedCompany = '';

    this.companies$ = new Observable;
    this.companies = [];
    this.departments$ = new Observable;
    this.departments = [];
    this.progress = false;
    this.employee = this.route.snapshot.data['employee'];

    this.isActive = this.employee.status;
  }

  ngOnInit(): void {
    this.companies$ = this.companiesService.list().pipe(
      catchError(error => {
        this.onError('Error on loading companies');
        return of([]);
      })
    );

    this.companies$.subscribe(result => this.companies = result);

    console.log(this.employee);

    this.form.setValue(
      {
        name: this.employee.name,
        surname: this.employee.surname,
        position: this.employee.position,
        email: this.employee.email,
        age: this.employee.age,
        status: this.employee.status,
        createdBy: this.employee.createdBy,
        createdDate: this.employee.createdDate,
        id: this.employee.id,
        modifiedBy: 'Patrick', //TODO
        modifiedDate: new Date()
      }
    );
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
      this.service.update(this.form.value)
        .subscribe({
          complete: () => {
            this.progress = false;
            this.snackBar.open('Employee updated', 'Close', { duration: 5000 });
            this.onDiscard();
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open('Error on updating employee', 'Close', { duration: 5000 });
            this.progress = false;
          }
      });

      let departmentEmployee: DepartmentEmployee = {
        id: 0,
        createdBy: 'Patrick',
        createdDate: new Date(),
        modifiedBy: 'Patrick',
        modifiedDate: new Date(),
        status: this.form.value.status,
        idDepartment: +this.selectedDepartment,
        idEmployee: this.employee.id
      }

      this.service.updateDepartmentEmployee(departmentEmployee)
        .subscribe({
          complete: () => {},
          error: () => {}
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
