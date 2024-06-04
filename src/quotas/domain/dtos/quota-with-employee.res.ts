import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { IQuota } from '../models/quota.interface'

export interface IQuotaWithEmployeeRes extends Omit<IQuota, 'employee'> {
  employee: IEmployeeRes
}
