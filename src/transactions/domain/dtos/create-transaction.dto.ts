import { ICreateItemDto } from 'src/items/domain/dtos/create-item.dto'
import {
  ITransaction,
  TransactionStatus,
} from '../models/transaction.interface'

export interface ICreateTransactionDto
  extends Omit<
    ITransaction,
    | 'id'
    | 'date'
    | 'total'
    | 'status'
    | 'expiration'
    | 'successProbability'
    | 'delegation'
    | 'task'
    | 'payMethod'
    | 'items'
  > {
  date?: Date
  total?: number
  status?: TransactionStatus
  expiration?: Date
  successProbability?: number
  delegationId: number
  taskId?: number
  payMethodId?: number
  items: ICreateItemDto[]
}
