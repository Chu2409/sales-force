import { IConsumerRes } from '../../dtos/consumer.res'
import { ICreateConsumerDto } from '../../dtos/create-consumer.dto'
import { IUpdateConsumerDto } from '../../dtos/update-consumer.dto'

export interface IConsumersRepositoryPort {
  getConsumers(): Promise<IConsumerRes[]>
  getConsumerById(id: number): Promise<IConsumerRes>
  createConsumer(consumer: ICreateConsumerDto): Promise<IConsumerRes>
  updateConsumer(
    id: number,
    consumer: IUpdateConsumerDto,
  ): Promise<IConsumerRes>
  setConsumerActive(id: number, state: boolean): Promise<boolean>
}
