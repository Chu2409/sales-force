import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateTransactionReq } from './create-transaction.req'
import { IUpdateTransactionDto } from 'src/transactions/domain/dtos/update-transaction.dto'
import { UpdateItemReq } from 'src/items/infrastructure/http-server/models/update-item.req'
import { Type } from 'class-transformer'
import {
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator'

export class UpdateTransactionReq
  extends PartialType(OmitType(CreateTransactionReq, ['items']))
  implements IUpdateTransactionDto
{
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UpdateItemReq)
  items: UpdateItemReq[]
}
