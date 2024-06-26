import { TransactionType } from '../models/transaction.interface'

export interface ITotalByEmployeeRes {
  type: TransactionType
  total: number
}
