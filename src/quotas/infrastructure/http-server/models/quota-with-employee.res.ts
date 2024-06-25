import { ApiProperty } from '@nestjs/swagger'
import { EmployeeRes } from 'src/employees/infrastructure/http-server/models/employee.res'
import { IQuotaWithEmployeeRes } from 'src/quotas/domain/dtos/quota-with-employee.res'

export class QuotaWithEmployeeRes implements IQuotaWithEmployeeRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  startDate: Date

  @ApiProperty()
  endDate: Date

  @ApiProperty()
  goal: number

  @ApiProperty()
  commission: number

  @ApiProperty()
  isAchieved: boolean

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  employee: EmployeeRes
}
