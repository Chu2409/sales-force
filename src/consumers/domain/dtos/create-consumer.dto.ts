import { ICreatePersonDto } from 'src/people/domain/dtos/create-person.dto'
import { IConsumerModel } from '../models/consumer.model'

export interface ICreateConsumerDto
  extends Omit<IConsumerModel, 'id' | 'person' | 'isCustomer'> {
  isCustomer?: boolean
  person: ICreatePersonDto
}
