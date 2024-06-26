import { Inject, Injectable } from '@nestjs/common'
import { ITransactionServicePort } from '../domain/ports/in/transactions.service.port'
import { ITransactionsRepositoryPort } from '../domain/ports/out/transactions.repository.port'
import { ICreateTransactionDto } from '../domain/dtos/create-transaction.dto'
import { IUpdateTransactionDto } from '../domain/dtos/update-transaction.dto'
import { TRANSACTIONS_REPOSITORY_PORT } from '../shared/transactions.consts'
import { ITransactionRes } from '../domain/dtos/transaction.res'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { PRODUCTS_SERVICE_PORT } from 'src/products/shared/products.consts'
import { IProductsServicePort } from 'src/products/domain/ports/in/products.service.port'
import {
  TransactionOrigin,
  TransactionStatus,
} from '../domain/models/transaction.interface'

@Injectable()
export class TransactionsService implements ITransactionServicePort {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY_PORT)
    private readonly repository: ITransactionsRepositoryPort,
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly productsService: IProductsServicePort,
  ) {}

  async createTransaction(
    createTransactionDto: ICreateTransactionDto,
  ): Promise<ITransactionRes> {
    createTransactionDto.items.forEach((item) => {
      if (!item.serviceId && !item.productId)
        throw new AppError(
          'Service or Product are required',
          Errors.BAD_REQUEST,
        )
    })

    const transaction = await this.repository.createTransaction({
      ...createTransactionDto,
      status:
        createTransactionDto.origin === TransactionOrigin.SALE
          ? TransactionStatus.PAID
          : createTransactionDto.status || TransactionStatus.PENDING,
    })
    if (!transaction)
      throw new AppError(
        'Transaction could not be created',
        Errors.INTERNAL_SERVER_ERROR,
      )

    const transactionWithTotal = await this.finishTransaction(
      transaction.id,
      transaction.payMethod?.tax,
    )
    if (!transactionWithTotal)
      throw new AppError(
        'Transaction could not be created',
        Errors.INTERNAL_SERVER_ERROR,
      )

    if (createTransactionDto.origin === TransactionOrigin.SALE) {
      const products = createTransactionDto.items
        .filter((item) => item.productId != null)
        .map((item) => ({ id: item.productId, quantity: item.quantity }))

      await this.productsService.discountProductStock(products)
    }

    return transactionWithTotal
  }

  async finishTransaction(id: number, tax?: number): Promise<ITransactionRes> {
    const transaction = await this.getTransactionById(id)

    let total = 0
    transaction.items.forEach((item) => {
      total += item.quantity * item.product?.price || item.service?.pricePerHour
    })

    if (tax) total += total * tax

    return this.repository.setTotal(id, total)
  }

  async updateTransaction(
    id: number,
    updateTransactionDto: IUpdateTransactionDto,
  ): Promise<ITransactionRes> {
    const transactionFound = await this.getTransactionById(id)
    if (transactionFound.origin === TransactionOrigin.SALE)
      throw new AppError(
        'Sale transactions cannot be updated',
        Errors.BAD_REQUEST,
      )

    const transaction = await this.repository.updateTransaction(id, {
      ...updateTransactionDto,
      status:
        updateTransactionDto.origin === TransactionOrigin.SALE
          ? TransactionStatus.PAID
          : updateTransactionDto.status || TransactionStatus.PENDING,
    })
    if (!transaction)
      throw new AppError(
        'Transaction could not be updated',
        Errors.INTERNAL_SERVER_ERROR,
      )

    const transactionWithTotal = await this.finishTransaction(id)
    if (!transactionWithTotal)
      throw new AppError(
        'Transaction could not be updated',
        Errors.INTERNAL_SERVER_ERROR,
      )

    if (updateTransactionDto.origin === TransactionOrigin.SALE) {
      const products = transaction.items
        .filter((item) => item.product != null)
        .map((item) => {
          if (item.product.id)
            return { id: item.product.id, quantity: item.quantity }
        })

      await this.productsService.discountProductStock(products)
    }

    return transactionWithTotal
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const transaction = await this.getTransactionById(id)
    if (transaction.status === TransactionStatus.PAID)
      throw new AppError(
        'Paid transactions cannot be deleted',
        Errors.BAD_REQUEST,
      )

    const deleted = await this.repository.deleteTransaction(id)
    if (!deleted)
      throw new AppError(
        'Transaction could not be deleted',
        Errors.INTERNAL_SERVER_ERROR,
      )

    return true
  }

  async getTransactionById(id: number): Promise<ITransactionRes> {
    const transaction = await this.repository.getTransactionById(id)

    if (!transaction)
      throw new AppError('Transaction not found', Errors.NOT_FOUND)

    return transaction
  }

  async getTransactions(): Promise<ITransactionRes[]> {
    return this.repository.getTransactions()
  }
}
