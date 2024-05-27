import { IPersonRes } from 'src/people/domain/dtos/person.res'
import { IConsumerModel } from '../models/consumer.model'

export interface IConsumerRes extends Omit<IConsumerModel, 'person'> {
  person: IPersonRes
}
