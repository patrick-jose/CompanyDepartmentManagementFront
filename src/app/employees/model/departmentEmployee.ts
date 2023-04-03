import { Department } from 'src/app/departments/model/department';

import { Employee } from './employee';

export interface DepartmentEmployee {
  employee: Employee,
  department: Department
}
