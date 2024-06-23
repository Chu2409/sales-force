import { IDelegationRes } from 'src/delegations/domain/dtos/delegation.res'
import { ITransaction } from '../models/transaction.interface'
import { IPayMethodRes } from 'src/pay-methods/domain/dtos/pay-method.res'
import { IItemRes } from 'src/items/domain/dtos/item.res'

export interface ITransactionRes
  extends Omit<ITransaction, 'delegation' | 'task' | 'payMethod' | 'items'> {
  delegation: IDelegationRes
  payMethod: IPayMethodRes | null
  items: IItemRes[]
}
