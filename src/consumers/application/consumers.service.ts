import { Inject, Injectable } from '@nestjs/common'
import { IConsumersServicePort } from '../domain/ports/in/consumers.service.port'
import { IConsumersRepositoryPort } from '../domain/ports/out/consumers.repository.port'
import { CONSUMERS_REPOSITORY_PORT } from '../shared/consumers-providers.consts'
import { IConsumerRes } from '../domain/dtos/consumer.res'
import { ICreateConsumerDto } from '../domain/dtos/create-consumer.dto'
import { IUpdateConsumerDto } from '../domain/dtos/update-consumer.dto'

@Injectable()
export class ConsumersService implements IConsumersServicePort {
  constructor(
    @Inject(CONSUMERS_REPOSITORY_PORT)
    private readonly repository: IConsumersRepositoryPort,
  ) {}

  async getConsumers(): Promise<IConsumerRes[]> {
    return await this.repository.getConsumers()
  }

  async createConsumer(consumer: ICreateConsumerDto): Promise<IConsumerRes> {
    return await this.repository.createConsumer(consumer)
  }

  async getConsumerById(consumerId: number): Promise<IConsumerRes> {
    return await this.repository.getConsumerById(consumerId)
  }

  async updateConsumer(
    id: number,
    consumer: IUpdateConsumerDto,
  ): Promise<IConsumerRes> {
    return await this.repository.updateConsumer(id, consumer)
  }

  async deleteConsumer(consumerId: number): Promise<boolean> {
    return await this.repository.deleteConsumer(consumerId)
  }
}
