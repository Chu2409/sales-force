import { Type } from 'class-transformer'
import { IsBoolean, IsDate, IsOptional, IsPositive } from 'class-validator'
import { ICreateQuotaDto } from 'src/quotas/domain/dtos/create-quota.dto'

export class CreateQuotaReq implements ICreateQuotaDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date

  @IsDate()
  @Type(() => Date)
  endDate: Date

  @IsPositive()
  goal: number

  @IsPositive()
  commission: number

  @IsOptional()
  @IsBoolean()
  isAchieved?: boolean

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsPositive()
  employeeId: number
}
