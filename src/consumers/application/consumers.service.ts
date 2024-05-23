import { Inject, Injectable } from '@nestjs/common'
import { IConsumersServicePort } from '../domain/ports/in/consumers.service.port'
import { IConsumersRepositoryPort } from '../domain/ports/out/consumers.repository.port'
import { ConsumerModel } from '../domain/models/consumer'

@Injectable()
export class ConsumersService implements IConsumersServicePort {
  constructor(
    @Inject('IConsumersRepositoryPort')
    private readonly repository: IConsumersRepositoryPort,
  ) {}

  public async getConsumers(): Promise<ConsumerModel[]> {
    return this.repository.getConsumers()
  }

  public async createConsumer(consumer: ConsumerModel): Promise<ConsumerModel> {
    return this.repository.createConsumer(consumer)
  }

  public async getConsumerById(consumerId: number): Promise<ConsumerModel> {
    return this.repository.getConsumerById(consumerId)
  }

  public async updateConsumer(
    id: number,
    consumer: ConsumerModel,
  ): Promise<ConsumerModel> {
    return this.repository.updateConsumer(id, consumer)
  }

  public async deleteConsumer(consumerId: number): Promise<boolean> {
    return this.repository.deleteConsumer(consumerId)
  }
}
