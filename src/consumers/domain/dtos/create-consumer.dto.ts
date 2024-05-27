import { ICreatePersonDto } from 'src/people/domain/dtos/create-person.dto'
import { ConsumerType, IConsumerModel } from '../models/consumer.model'

export interface ICreateConsumerDto
  extends Omit<IConsumerModel, 'id' | 'person' | 'isCustomer'> {
  type: ConsumerType
  isCustomer?: boolean
  person: ICreatePersonDto
}
