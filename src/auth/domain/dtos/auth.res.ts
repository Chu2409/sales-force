import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'

export interface IAuthRes {
  token: string
  employee: IEmployeeRes
}
