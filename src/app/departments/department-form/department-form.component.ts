import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { Company } from 'src/app/companies/model/company';
import { CompaniesService } from 'src/app/companies/services/companies.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Department } from '../model/department';
import { DepartmentsService } from '../services/departments.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  form: FormGroup;
  selectedCompany: string;
  companies$: Observable<Company[]>;
  companies: Company[];
  progress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private companiesService: CompaniesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private service: DepartmentsService) {
    this.form = this.formBuilder.group({
      name: new FormControl<string>(''),
      description: new FormControl<string>(''),
      phone: new FormControl<string>('')
    });
    this.selectedCompany = '';

    this.companies$ = new Observable;
    this.companies = [];
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

  onSubmit() {
    let company: Company = {
      id: +this.selectedCompany,
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
      id: 0,
      createdBy: 'Patrick', // TODO: get user from login
      createdDate: new Date(),
      modifiedBy: 'Patrick', // TODO: get user from login
      modifiedDate: new Date(),
      status: true,
      description: this.form.value.description,
      name: this.form.value.name,
      phone: this.form.value.phone,
      company: company
    }

    if (this.form.value.name == '') {
      this.snackBar.open('You must enter the name of the department', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else if (this.selectedCompany == null || this.selectedCompany == '') {
      this.snackBar.open('You must choose the company', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else {
      this.service.save(department)
        .subscribe({
          complete: () => {
            this.progress = false;
            this.snackBar.open('Department added', 'Close', { duration: 5000 });
            this.onDiscard();
          },
          error: error => {
            console.log(error);
            this.snackBar.open('Error on saving department', 'Close', { duration: 5000 });
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
