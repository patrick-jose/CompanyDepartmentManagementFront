import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Company } from '../model/company';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-company-form-edit',
  templateUrl: './company-form-edit.component.html',
  styleUrls: ['./company-form-edit.component.css']
})
export class CompanyFormEditComponent implements OnInit {
  form: FormGroup;
  progress: boolean;
  isActive: boolean;
  companyId: number = 0;
  company: Company;

  constructor(
    private formBuilder: FormBuilder,
    private service: CompaniesService,
    private snackBar: MatSnackBar,
    private location: Location,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl<string>(''),
      address: new FormControl<string>(''),
      phone: new FormControl<string>(''),
      createdBy: new FormControl<string>(''),
      createdDate: new FormControl<Date>(new Date()),
      modifiedBy: new FormControl<string>(''),
      status: new FormControl<boolean>(true),
      modifiedDate: new FormControl<Date>(new Date()),
      id: new FormControl<number>(0)
    })
    this.progress = false;
    this.isActive = true;
    this.company = this.route.snapshot.data['company'];
  }

  ngOnInit(): void {
    this.form.setValue(
      {
        name: this.company.name,
        address: this.company.address,
        phone: this.company.phone,
        createdBy: this.company.createdBy,
        createdDate: this.company.createdDate,
        modifiedBy: 'Patrick modificação',
        status: this.company.status,
        modifiedDate: new Date(),
        id: this.company.id
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
      this.snackBar.open('You must enter the name of the company', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else {
      this.service.update(this.form.value)
        .subscribe({
          complete: () => {
            this.progress = false;
            this.snackBar.open('Company updated', 'Close', { duration: 5000 });
            this.onDiscard();
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open('Error on updating company', 'Close', { duration: 5000 });
            this.progress = false;
          }
      });
    }
  }

  onDiscard() {
    this.location.back();
  }
}
