import { ICreateTransactionDto } from '../../dtos/create-transaction.dto'
import { IUpdateTransactionDto } from '../../dtos/update-transaction.dto'
import { ITransactionRes } from '../../dtos/transaction.res'

export interface ITransactionServicePort {
  createTransaction(
    createTransactionDto: ICreateTransactionDto,
  ): Promise<ITransactionRes>
  updateTransaction(
    id: number,
    updateTransactionDto: IUpdateTransactionDto,
  ): Promise<ITransactionRes>
  deleteTransaction(id: number): Promise<boolean>
  getTransactionById(id: number): Promise<ITransactionRes>
  getTransactions(): Promise<ITransactionRes[]>
  finishTransaction(id: number, tax?: number): Promise<ITransactionRes>
}
