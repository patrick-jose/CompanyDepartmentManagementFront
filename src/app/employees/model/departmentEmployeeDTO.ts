import { Department } from 'src/app/departments/model/department';

import { Employee } from './employee';

export interface DepartmentEmployeeDTO {
  employee: Employee,
  department: Department
}
