import { IPersonWithLocationRes } from 'src/people/domain/dtos/person-with-location.res'
import { IConsumer } from '../models/consumer.interface'

export interface IConsumerRes extends Omit<IConsumer, 'person'> {
  person: IPersonWithLocationRes
}
