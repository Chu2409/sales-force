import { ApiProperty } from '@nestjs/swagger'
import { IConsumerRes } from 'src/consumers/domain/dtos/consumer.res'
import { ConsumerType } from 'src/consumers/domain/models/consumer.interface'
import { PersonWithLocationRes } from 'src/people/infrastructure/http-server/models/person-with-location.res'

export class ConsumerRes implements IConsumerRes {
  @ApiProperty()
  id: number

  @ApiProperty({ enum: ConsumerType })
  type: ConsumerType

  @ApiProperty()
  isCustomer: boolean

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  person: PersonWithLocationRes
}
