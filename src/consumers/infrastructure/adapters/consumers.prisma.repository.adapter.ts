import { Inject, Injectable } from '@nestjs/common'
import { IConsumersRepositoryPort } from 'src/consumers/domain/ports/out/consumers.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IConsumerRes } from 'src/consumers/domain/dtos/consumer.res'
import { ICreateConsumerDto } from 'src/consumers/domain/dtos/create-consumer.dto'
import { IUpdateConsumerDto } from 'src/consumers/domain/dtos/update-consumer.dto'
import { ConsumerType } from 'src/consumers/domain/models/consumer.model'
import { PersonGender } from 'src/people/domain/models/person.model'

@Injectable()
export class ConsumersPrismaRepositoryAdapter
  implements IConsumersRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getConsumers(): Promise<IConsumerRes[]> {
    const consumers = await this.prismaService.consumer.findMany({
      include: { person: true },
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return consumers.map(({ personId, ...consumer }) => ({
      ...consumer,
      type: consumer.type as ConsumerType,
      person: {
        ...consumer.person,
        gender: consumer.person.gender as PersonGender,
      },
    }))
  }

  async getConsumerById(id: number): Promise<IConsumerRes> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { personId, ...consumer } =
      await this.prismaService.consumer.findUnique({
        where: { id },
        include: { person: true },
      })

    return {
      ...consumer,
      type: consumer.type as ConsumerType,
      person: {
        ...consumer.person,
        gender: consumer.person.gender as PersonGender,
      },
    }
  }

  async createConsumer({
    person,
    ...consumer
  }: ICreateConsumerDto): Promise<IConsumerRes> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

        include: { person: true },
      })

    return {
      ...consumerCreated,
      type: consumerCreated.type as ConsumerType,
      person: {
        ...consumerCreated.person,
        gender: consumerCreated.person.gender as PersonGender,
      },
    }
  }

  async updateConsumer(
    id: number,
    { person, ...consumer }: IUpdateConsumerDto,
  ): Promise<IConsumerRes> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        include: { person: true },
      })

    return {
      ...consumerUpdated,
      type: consumerUpdated.type as ConsumerType,
      person: {
        ...consumerUpdated.person,
        gender: consumerUpdated.person.gender as PersonGender,
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