import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsInt, IsDefined } from 'class-validator'
import { ICreateItemDto } from 'src/items/domain/dtos/create-item.dto'

export class CreateItemReq implements ICreateItemDto {
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  discount?: number

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  productId?: number

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  serviceId?: number

  @IsInt()
  @IsDefined()
  @ApiProperty()
  quantity: number
}
