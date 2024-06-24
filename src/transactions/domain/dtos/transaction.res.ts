import { ITransaction } from '../models/transaction.interface'
import { IPayMethodRes } from 'src/pay-methods/domain/dtos/pay-method.res'
import { IItemRes } from 'src/items/domain/dtos/item.res'
import { IFullDelegationRes } from 'src/delegations/domain/dtos/full-delegation.res'

export interface ITransactionRes
  extends Omit<ITransaction, 'delegation' | 'task' | 'payMethod' | 'items'> {
  delegation: IFullDelegationRes
  payMethod: IPayMethodRes | null
  items: IItemRes[]
}
