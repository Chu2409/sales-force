import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsPositive } from 'class-validator'
import { ICreateDelegationDto } from 'src/delegations/domain/dtos/create-delegation.dto'

export class CreateDelegationReq implements ICreateDelegationDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isActive?: boolean

  @IsPositive()
  @ApiProperty()
  consumerId: number

  @IsPositive()
  @ApiProperty()
  employeeId: number
}
