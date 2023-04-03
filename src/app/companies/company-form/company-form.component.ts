import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      name: new FormControl<string>(''),
      address: new FormControl<string>(''),
      phone: new FormControl<string>(''),
      createdBy: new FormControl<string>(''),
      createdDate: new FormControl<Date>(new Date()),
      modifiedBy: new FormControl<string>(''),
      status: new FormControl<boolean>(true),
      modifiedDate: new FormControl<Date>(new Date())
    });
    this.progress = false;
  }

  onSubmit() {
    this.progress = true;

    this.form.value.createdBy = 'Patrick'; // TODO: get user from login
    this.form.value.modifiedBy = 'Patrick'; // TODO: get user from login

    if (this.form.value.name == null || this.form.value.name == '') {
      this.snackBar.open('You must enter the name of the company', 'Close', { duration: 5000 });
      this.progress = false;
    }
    else {
      this.service.save(this.form.value)
        .subscribe({
          complete: () => {
            this.progress = false;
            this.snackBar.open('Company added', 'Close', { duration: 5000 });
            this.onDiscard();
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open('Error on saving company', 'Close', { duration: 5000 });
            this.progress = false;
          }
      });
    }
  }

  onDiscard() {
    this.location.back();
  }
}
