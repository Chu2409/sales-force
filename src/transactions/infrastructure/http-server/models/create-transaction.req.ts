import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({ required: false })
  date?: Date

  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false })
  total?: number

  @IsOptional()
  @IsEnum(TransactionStatus)
  @ApiProperty({ enum: TransactionStatus, required: false })
  status?: TransactionStatus

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ required: false })
  expiration?: Date

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ required: false })
  successProbability?: number

  @IsInt()
  @IsPositive()
  @ApiProperty()
  delegationId: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ required: false })
  taskId?: number

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ required: false })
  payMethodId?: number

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItemReq)
  @ApiProperty({ isArray: true, type: CreateItemReq })
  items: CreateItemReq[]

  @IsEnum(TransactionType)
  @ApiProperty({ enum: TransactionType })
  type: TransactionType

  @IsEnum(TransactionOrigin)
  @ApiProperty({ enum: TransactionOrigin })
  origin: TransactionOrigin
}
