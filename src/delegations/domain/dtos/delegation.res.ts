import { IConsumerRes } from 'src/consumers/domain/dtos/consumer.res'
import { IDelegation } from '../models/delegation.interface'

export interface IDelegationRes
  extends Omit<IDelegation, 'consumer' | 'employee'> {
  consumer: IConsumerRes
}
