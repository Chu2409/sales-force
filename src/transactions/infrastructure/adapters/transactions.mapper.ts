import { PayMethod, Transaction } from '@prisma/client'
import {
  DelegationsMapper,
  IPrismaWithConsumerDelegation,
} from 'src/delegations/infrastructure/adapters/delegations.mapper'
import {
  IPrismaItem,
  ItemsMapper,
} from 'src/items/infrastructure/adapters/items.mapper'
import { ITransactionRes } from 'src/transactions/domain/dtos/transaction.res'
import {
  TransactionOrigin,
  TransactionStatus,
  TransactionType,
} from 'src/transactions/domain/models/transaction.interface'

export interface IPrismaTransaction extends Transaction {
  delegation: IPrismaWithConsumerDelegation
  payMethod: PayMethod
  items: IPrismaItem[]
}

export class TransactionsMapper {
  static toRes({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delegationId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    payMethodId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    taskId,
    items,
    ...transaction
  }: IPrismaTransaction): ITransactionRes {
    return {
      ...transaction,
      origin: transaction.origin as TransactionOrigin,
      status: transaction.status as TransactionStatus,
      type: transaction.type as TransactionType,
      delegation: DelegationsMapper.toRes(transaction.delegation),
      items: items.map(ItemsMapper.toRes),
    }
  }
}
