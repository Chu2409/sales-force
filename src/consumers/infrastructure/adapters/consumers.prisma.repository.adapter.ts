import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

    if (!consumer) throw new NotFoundException('Consumer not found')

    return ConsumersMapper.toRes(consumer)
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

    return ConsumersMapper.toRes(createdConsumer)
  }

  async updateConsumer(
    id: number,
    consumer: IUpdateConsumerDto,
  ): Promise<IConsumerRes> {
    await this.getConsumerById(id)

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

    return ConsumersMapper.toRes(updatedConsumer)
  }

  async deleteConsumer(id: number): Promise<boolean> {
    await this.getConsumerById(id)

    const consumer = await this.prismaService.consumer.update({
      where: { id },
      data: { isActive: false },
    })
    return !!consumer
  }
}
