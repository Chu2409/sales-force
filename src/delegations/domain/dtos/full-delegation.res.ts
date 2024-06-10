import { IConsumerRes } from 'src/consumers/domain/dtos/consumer.res'
import { IDelegation } from '../models/delegation.interface'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'

export interface IFullDelegationRes
  extends Omit<IDelegation, 'consumer' | 'employee'> {
  consumer: IConsumerRes
  employee: IEmployeeRes
}
