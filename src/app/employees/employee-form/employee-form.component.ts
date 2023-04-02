import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/departments/model/department';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  form: FormGroup;
  departments: Department[];
  progress: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      name: [null],
      surname: [null],
      email: [null],
      position: [null],
      age: [null],
      createdBy: [null],
      createdDate: [null],
      modifiedBy: [null],
      status: [null],
      modifiedDate: [null],
      idDepartment: [null]
    });

    this.progress = false;
    this.departments = [];
  }

  onSubmit() {
    this.form.value.createdBy = 'Patrick'; // TODO: get user from login
    this.form.value.createdDate = new Date();
    this.form.value.modifiedBy = 'Patrick'; // TODO: get user from login
    this.form.value.status = true;
    this.form.value.modifiedDate = new Date();
    this.form.value.idDepartment = 1 // TODO: get id department from selection

    console.log(this.form.value);
  }

  onDiscard() {
    this.router.navigate(['employees']);
  }
}
