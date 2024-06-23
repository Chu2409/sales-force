import { PartialType } from '@nestjs/swagger'
import { CreateItemReq } from './create-item.req'
import { IUpdateItemDto } from 'src/items/domain/dtos/update-item.dto'

export class UpdateItemReq
  extends PartialType(CreateItemReq)
  implements IUpdateItemDto {}
