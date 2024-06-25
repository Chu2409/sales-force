import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsDate, IsOptional, IsPositive } from 'class-validator'
import { ICreateQuotaDto } from 'src/quotas/domain/dtos/create-quota.dto'

export class CreateQuotaReq implements ICreateQuotaDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  startDate: Date

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  endDate: Date

  @IsPositive()
  @ApiProperty({ minimum: 0 })
  goal: number

  @IsPositive()
  @ApiProperty({ minimum: 0 })
  commission: number

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isAchieved?: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isActive?: boolean

  @IsPositive()
  @ApiProperty()
  employeeId: number
}
