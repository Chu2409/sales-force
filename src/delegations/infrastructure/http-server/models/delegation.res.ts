import { ApiProperty } from '@nestjs/swagger'
import { ConsumerRes } from 'src/consumers/infrastructure/http-server/models/consumer.res'
import { IDelegationRes } from 'src/delegations/domain/dtos/delegation.res'

export class DelegationRes implements IDelegationRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  consumer: ConsumerRes
}
