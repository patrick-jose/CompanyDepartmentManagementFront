import { Company } from "src/app/companies/model/company";

export interface Department {
  id: number;
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
  status: boolean;
  description: string;
  name: string;
  phone: string;
  company: Company;
}
