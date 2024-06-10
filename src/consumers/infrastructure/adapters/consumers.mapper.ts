import { Consumer } from '@prisma/client'
import { IConsumerRes } from 'src/consumers/domain/dtos/consumer.res'
import { ConsumerType } from 'src/consumers/domain/models/consumer.interface'
import {
  PeopleMapper,
  IPrismaPersonWithLocation,
} from 'src/people/infrastructure/adapters/people.mapper'

export interface IPrismaFullConsumer extends Consumer {
  person: IPrismaPersonWithLocation
}
export class ConsumersMapper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toRes({ personId, ...consumer }: IPrismaFullConsumer): IConsumerRes {
    return {
      ...consumer,
      type: consumer.type as ConsumerType,
      person: PeopleMapper.toResWithLocation(consumer.person),
    }
  }
}
