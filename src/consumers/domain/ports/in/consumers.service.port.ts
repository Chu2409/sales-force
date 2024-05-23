import { ConsumerModel } from '../../models/consumer'

export interface IConsumersServicePort {
  getConsumers(): Promise<ConsumerModel[]>
  getConsumerById(id: number): Promise<ConsumerModel | null>
  createConsumer(consumer: ConsumerModel): Promise<ConsumerModel>
  updateConsumer(id: number, consumer: ConsumerModel): Promise<ConsumerModel>
  deleteConsumer(id: number): Promise<boolean>
}
