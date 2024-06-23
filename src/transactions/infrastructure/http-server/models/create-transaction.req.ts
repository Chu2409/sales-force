import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator'
import { CreateItemReq } from 'src/items/infrastructure/http-server/models/create-item.req'
import { ICreateTransactionDto } from 'src/transactions/domain/dtos/create-transaction.dto'
import {
  TransactionStatus,
  TransactionType,
  TransactionOrigin,
} from 'src/transactions/domain/models/transaction.interface'

export class CreateTransactionReq implements ICreateTransactionDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date

  @IsOptional()
  @IsPositive()
  total?: number

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiration?: Date

  @IsOptional()
  @IsInt()
  @IsPositive()
  successProbability?: number

  @IsInt()
  @IsPositive()
  delegationId: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  taskId?: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  payMethodId?: number

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItemReq)
  items: CreateItemReq[]

  @IsEnum(TransactionType)
  type: TransactionType

  @IsEnum(TransactionOrigin)
  origin: TransactionOrigin
}
