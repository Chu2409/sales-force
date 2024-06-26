import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsOptional, IsPositive } from 'class-validator'
import { ICreateChanceInDto } from 'src/chances/domain/dtos/create-chance.in.dto'
import { ChanceStatus } from 'src/chances/domain/models/chance.interface'

export class CreateChanceReq implements ICreateChanceInDto {
  @IsOptional()
  @IsEnum(ChanceStatus)
  @ApiProperty({ enum: ChanceStatus, required: false })
  status?: ChanceStatus

  @IsPositive()
  @ApiProperty()
  employeeId: number

  @IsPositive()
  @ApiProperty()
  consumerId: number

  @IsPositive()
  @ApiProperty()
  amount: number

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  date: Date
}
