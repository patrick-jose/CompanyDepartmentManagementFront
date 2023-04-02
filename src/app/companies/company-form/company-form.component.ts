import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {

  form: FormGroup;
  progress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: CompaniesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      address: [null],
      phone: [null],
      createdBy: [null],
      createdDate: [null],
      modifiedBy: [null],
      status: [null],
      modifiedDate: [null]
    });
    this.progress = false;
  }

  onSubmit() {
    this.progress = true;

    this.form.value.createdBy = 'Patrick'; // TODO: get user from login
    this.form.value.createdDate = new Date();
    this.form.value.modifiedBy = 'Patrick'; // TODO: get user from login
    this.form.value.status = true;
    this.form.value.modifiedDate = new Date();

    if (this.form.value.name == null || this.form.value.name == '') {
      this.snackBar.open('You must enter the name of the company', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else {
      this.service.save(this.form.value)
        .subscribe(
          result => {
            this.progress = false;
            this.snackBar.open('Company added', 'Close', { duration: 5000 });
            this.onDiscard();
          },
          error => {
            console.log(error);
            this.snackBar.open('Error on saving company', 'Close', { duration: 5000 });
            this.progress = false;
          }
        );
    }
  }

  onDiscard() {
    this.location.back();
  }
}
