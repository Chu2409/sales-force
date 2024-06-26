import { ApiProperty } from '@nestjs/swagger'
import { FullDelegationRes } from 'src/delegations/infrastructure/http-server/models/full-delegation.res'
import { ItemRes } from 'src/items/infrastructure/http-server/models/item.res'
import { PayMethodRes } from 'src/pay-methods/infrastructure/http-server/models/pay-method.res'
import { TaskRes } from 'src/tasks/infrastructure/http-server/models/task.res'
import { ITransactionRes } from 'src/transactions/domain/dtos/transaction.res'
import {
  TransactionStatus,
  TransactionType,
  TransactionOrigin,
} from 'src/transactions/domain/models/transaction.interface'

export class TransactionRes implements ITransactionRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  date: Date

  @ApiProperty({ nullable: true })
  total: number | null

  @ApiProperty({ enum: TransactionStatus, nullable: true })
  status: TransactionStatus | null

  @ApiProperty({ enum: TransactionType })
  type: TransactionType

  @ApiProperty({ enum: TransactionOrigin })
  origin: TransactionOrigin

  @ApiProperty({ nullable: true })
  expiration: Date | null

  @ApiProperty({ nullable: true })
  successProbability: number | null

  @ApiProperty({ nullable: true })
  payMethod: PayMethodRes | null

  @ApiProperty()
  delegation: FullDelegationRes

  @ApiProperty({ isArray: true })
  items: ItemRes[]

  @ApiProperty()
  task: TaskRes
}
