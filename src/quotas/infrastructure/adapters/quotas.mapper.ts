import { Quota } from '@prisma/client'
import {
  EmployeesMapper,
  IPrismaFullEmployee,
} from 'src/employees/infrastructure/adapters/employees.mapper'
import { IQuotaWithEmployeeRes } from 'src/quotas/domain/dtos/quota-with-employee.res'

interface IPrismaFullQuota extends Quota {
  employee: IPrismaFullEmployee
}

export class QuotasMapper {
  static toRes({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    employeeId,
    ...quota
  }: IPrismaFullQuota): IQuotaWithEmployeeRes {
    return {
      ...quota,
      employee: EmployeesMapper.toRes(quota.employee),
    }
  }
}
