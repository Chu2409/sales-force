import { IConsumerRes } from '../../dtos/consumer.res'
import { ICreateConsumerDto } from '../../dtos/create-consumer.dto'
import { IUpdateConsumerDto } from '../../dtos/update-consumer.dto'

export interface IConsumersRepositoryPort {
  getConsumers(): Promise<IConsumerRes[]>
  getConsumerById(id: number): Promise<IConsumerRes | null>
  createConsumer(consumer: ICreateConsumerDto): Promise<IConsumerRes>
  updateConsumer(
    id: number,
    consumer: IUpdateConsumerDto,
  ): Promise<IConsumerRes>
  deleteConsumer(id: number): Promise<boolean>
}
