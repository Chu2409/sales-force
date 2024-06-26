import { ITransactionRes } from '../../dtos/transaction.res'
import { ICreateTransactionDto } from '../../dtos/create-transaction.dto'
import { IUpdateTransactionDto } from '../../dtos/update-transaction.dto'
import { ITotalMonthlyRes } from '../../dtos/total-monthly.res'

export interface ITransactionsRepositoryPort {
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
  setTotal(id: number, total: number): Promise<ITransactionRes>
  getTotalMonthlyByYear(year: number): Promise<ITotalMonthlyRes>
}
