import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsOptional, IsPositive } from 'class-validator'
import { ICreateChanceInDto } from 'src/chances/domain/dtos/create-chance.in.dto'
import { ChanceStatus } from 'src/chances/domain/models/chance.interface'

export class CreateChanceReq implements ICreateChanceInDto {
  @IsOptional()
  @IsEnum(ChanceStatus)
  status?: ChanceStatus

  @IsPositive()
  employeeId: number

  @IsPositive()
  consumerId: number

  @IsPositive()
  amount: number

  @IsDate()
  @Type(() => Date)
  date: Date
}
