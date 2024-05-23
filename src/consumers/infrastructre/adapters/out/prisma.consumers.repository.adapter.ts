import { Inject, Injectable } from '@nestjs/common'
import { ConsumerModel } from 'src/consumers/domain/models/consumer'
import { IConsumersRepositoryPort } from 'src/consumers/domain/ports/out/consumers.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { ConsumersMapper } from '../mappers/consumers.mapper'

@Injectable()
export class PrismaConsumersRepositoryAdapter
  implements IConsumersRepositoryPort
{
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getConsumers(): Promise<ConsumerModel[]> {
    return ConsumersMapper.toModels(
      await this.prismaService.consumer.findMany(),
    )
  }

  async getConsumerById(id: number): Promise<ConsumerModel> {
    return ConsumersMapper.toModel(
      await this.prismaService.consumer.findUnique({
        where: { id },
      }),
    )
  }

  async createConsumer(consumer: ConsumerModel): Promise<ConsumerModel> {
    return ConsumersMapper.toModel(
      await this.prismaService.consumer.create({
        data: {
          type: consumer.getType(),
          isCustomer: consumer.getIsCustomer(),
          personId: consumer.getPersonId(),
        },
      }),
    )
  }

  async updateConsumer(
    id: number,
    consumer: ConsumerModel,
  ): Promise<ConsumerModel> {
    return ConsumersMapper.toModel(
      await this.prismaService.consumer.update({
        where: { id },
        data: {
          type: consumer.getType(),
          isCustomer: consumer.getIsCustomer(),
          personId: consumer.getPersonId(),
        },
      }),
    )
  }

  async deleteConsumer(id: number): Promise<boolean> {
    const consumer = await this.prismaService.consumer.delete({
      where: { id },
    })
    return !!consumer
  }
}
