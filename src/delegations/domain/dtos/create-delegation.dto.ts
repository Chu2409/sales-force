import { IDelegation } from '../models/delegation.interface'

export interface ICreateDelegationDto
  extends Omit<IDelegation, 'id' | 'isActive' | 'consumer' | 'employee'> {
  isActive?: boolean
  consumerId: number
  employeeId: number
}
