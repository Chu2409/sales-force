/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common'
import { IConsumersRepositoryPort } from 'src/consumers/domain/ports/out/consumers.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IConsumerRes } from 'src/consumers/domain/dtos/consumer.res'
import { ICreateConsumerDto } from 'src/consumers/domain/dtos/create-consumer.dto'
import { IUpdateConsumerDto } from 'src/consumers/domain/dtos/update-consumer.dto'
import { ConsumerType } from 'src/consumers/domain/models/consumer.model'
import { PersonGender } from 'src/people/domain/models/person.model'
import { LocationType } from 'src/locations/domain/models/location.model'

@Injectable()
export class ConsumersPrismaRepositoryAdapter
  implements IConsumersRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getConsumers(): Promise<IConsumerRes[]> {
    const consumers = await this.prismaService.consumer.findMany({
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return consumers.map(({ personId, ...consumer }) => {
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
    })
  }

  async getConsumerById(id: number): Promise<IConsumerRes> {
    const { personId, ...consumer } =
      await this.prismaService.consumer.findUnique({
        where: { id },
        include: {
          person: {
            include: { location: true },
          },
        },
      })

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

  async createConsumer({
    person,
    ...consumer
  }: ICreateConsumerDto): Promise<IConsumerRes> {
    const { personId, ...consumerCreated } =
      await this.prismaService.consumer.create({
        data: {
          ...consumer,
          person: {
            create: {
              ...person,
            },
          },
        },

        include: {
          person: {
            include: { location: true },
          },
        },
      })

    const { locationId, ...personCreated } = consumerCreated.person
    const { parentId, ...location } = personCreated.location
    return {
      ...consumerCreated,
      type: consumerCreated.type as ConsumerType,
      person: {
        ...personCreated,
        gender: personCreated.gender as PersonGender,
        location: {
          ...location,
          type: location.type as LocationType,
        },
      },
    }
  }

  async updateConsumer(
    id: number,
    { person, ...consumer }: IUpdateConsumerDto,
  ): Promise<IConsumerRes> {
    const { personId, ...consumerUpdated } =
      await this.prismaService.consumer.update({
        where: { id },
        data: {
          ...consumer,
          person: {
            update: {
              data: {
                ...person,
              },
            },
          },
        },
        include: {
          person: {
            include: { location: true },
          },
        },
      })

    const { locationId, ...personCreated } = consumerUpdated.person
    const { parentId, ...location } = personCreated.location
    return {
      ...consumerUpdated,
      type: consumerUpdated.type as ConsumerType,
      person: {
        ...personCreated,
        gender: personCreated.gender as PersonGender,
        location: {
          ...location,
          type: location.type as LocationType,
        },
      },
    }
  }

  async deleteConsumer(id: number): Promise<boolean> {
    const consumer = await this.prismaService.consumer.delete({
      where: { id },
    })
    return !!consumer
  }
}
