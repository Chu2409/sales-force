import { IsOptional, IsInt, IsDefined } from 'class-validator'
import { ICreateItemDto } from 'src/items/domain/dtos/create-item.dto'

export class CreateItemReq implements ICreateItemDto {
  @IsOptional()
  @IsInt()
  discount?: number

  @IsOptional()
  @IsInt()
  productId?: number

  @IsOptional()
  @IsInt()
  serviceId?: number

  @IsInt()
  @IsDefined()
  quantity: number
}
