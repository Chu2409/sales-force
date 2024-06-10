import { IsBoolean, IsOptional, IsPositive } from 'class-validator'
import { ICreateDelegationDto } from 'src/delegations/domain/dtos/create-delegation.dto'

export class CreateDelegationReq implements ICreateDelegationDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @IsPositive()
  consumerId: number

  @IsPositive()
  employeeId: number
}
