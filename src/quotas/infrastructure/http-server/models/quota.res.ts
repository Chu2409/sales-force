import { ApiProperty } from '@nestjs/swagger'
import { IQuotaRes } from 'src/quotas/domain/dtos/quota.res'

export class QuotaRes implements IQuotaRes {
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
}
