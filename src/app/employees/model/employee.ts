import { Department } from "src/app/departments/model/department";

export interface Employee {
  id: number;
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
  status: boolean;
  age: number;
  name: string;
  email: string;
  position: string;
  surname: string;
  department: Department;
}
