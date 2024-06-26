import { ApiProperty } from '@nestjs/swagger'
import { ConsumerRes } from 'src/consumers/infrastructure/http-server/models/consumer.res'
import { IFullDelegationRes } from 'src/delegations/domain/dtos/full-delegation.res'
import { EmployeeRes } from 'src/employees/infrastructure/http-server/models/employee.res'

export class FullDelegationRes implements IFullDelegationRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  employee: EmployeeRes

  @ApiProperty()
  consumer: ConsumerRes
}
