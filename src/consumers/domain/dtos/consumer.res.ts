import { IPersonRes } from 'src/people/domain/dtos/person.res'
import { IConsumer } from '../models/consumer.interface'

export interface IConsumerRes extends Omit<IConsumer, 'person'> {
  person: IPersonRes
}
