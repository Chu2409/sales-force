import { ICreatePersonDto } from 'src/people/domain/dtos/create-person.dto'
import { IConsumer } from '../models/consumer.interface'

export interface ICreateConsumerDto
  extends Omit<IConsumer, 'id' | 'person' | 'isCustomer'> {
  isCustomer?: boolean
  person: ICreatePersonDto
}
