/* eslint-disable @typescript-eslint/no-unused-vars */
import { Consumer, Location, Person } from '@prisma/client'
import { IConsumerRes } from 'src/consumers/domain/dtos/consumer.res'
import { ConsumerType } from 'src/consumers/domain/models/consumer.interface'
import { LocationType } from 'src/locations/domain/models/location.interface'
import { PersonGender } from 'src/people/domain/models/person.interface'

interface IFullConsumerPrisma extends Consumer {
  person: Person & { location: Location }
}

export class ConsumersMapper {
  static toRes({ personId, ...consumer }: IFullConsumerPrisma): IConsumerRes {
    const { locationId, ...person } = consumer.person
    const { parentId, ...location } = person.location
    return {
      ...consumer,
      type: consumer.type as ConsumerType,
      person: {
        ...person,
        gender: person.gender as PersonGender,
        location: {
          ...location,
          type: location.type as LocationType,
        },
      },
    }
  }
}
