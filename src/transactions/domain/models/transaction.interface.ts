import { IDelegation } from 'src/delegations/domain/models/delegation.interface'
import { IItem } from 'src/items/domain/models/item.interface'
import { IPayMethod } from 'src/pay-methods/domain/models/pay-method.interface'
import { ITask } from 'src/tasks/domain/models/task.interface'

export enum TransactionStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
}

export enum TransactionType {
  LOCAL = 'LOCAL',
  ONLINE = 'ONLINE',
  DOOR_TO_DOOR = 'DOOR_TO_DOOR',
}

export enum TransactionOrigin {
  SALE = 'SALE',
  QUOTATION = 'QUOTATION',
}

export interface ITransaction {
  id: number
  date: Date
  total: number | null
  status: TransactionStatus | null
  type: TransactionType
  origin: TransactionOrigin
  expiration: Date | null
  successProbability: number | null
  delegation: IDelegation
  task: ITask | null
  payMethod: IPayMethod | null
  items: IItem[]
}
