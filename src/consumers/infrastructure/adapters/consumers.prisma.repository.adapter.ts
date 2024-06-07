import { Inject, Injectable } from '@nestjs/common'
import { IConsumersRepositoryPort } from 'src/consumers/domain/ports/out/consumers.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IConsumerRes } from 'src/consumers/domain/dtos/consumer.res'
import { ICreateConsumerDto } from 'src/consumers/domain/dtos/create-consumer.dto'
import { IUpdateConsumerDto } from 'src/consumers/domain/dtos/update-consumer.dto'
import { ConsumersMapper } from './consumers.mapper'

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

    return consumers.map((consumer) => ConsumersMapper.toRes(consumer))
  }

  async getConsumerById(id: number): Promise<IConsumerRes> {
    const consumer = await this.prismaService.consumer.findUnique({
      where: { id },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return consumer ? ConsumersMapper.toRes(consumer) : null
  }

  async createConsumer(consumer: ICreateConsumerDto): Promise<IConsumerRes> {
    const createdConsumer = await this.prismaService.consumer.create({
      data: {
        ...consumer,
        person: {
          create: {
            ...consumer.person,
          },
        },
      },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return createdConsumer ? ConsumersMapper.toRes(createdConsumer) : null
  }

  async updateConsumer(
    id: number,
    consumer: IUpdateConsumerDto,
  ): Promise<IConsumerRes> {
    const updatedConsumer = await this.prismaService.consumer.update({
      where: { id },
      data: {
        ...consumer,
        person: {
          update: {
            ...consumer.person,
          },
        },
      },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return updatedConsumer ? ConsumersMapper.toRes(updatedConsumer) : null
  }

  async setConsumerActive(id: number, state: boolean): Promise<boolean> {
    const consumer = await this.prismaService.consumer.update({
      where: { id },
      data: { isActive: state },
    })
    return !!consumer
  }
}
