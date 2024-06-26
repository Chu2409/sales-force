import { ApiProperty } from '@nestjs/swagger'
import { IItemRes } from 'src/items/domain/dtos/item.res'
import { ProductRes } from 'src/products/infrastructure/http-server/models/product.res'
import { ServiceRes } from 'src/services/infraestructure/http-server/models/service.res'

export class ItemRes implements IItemRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  quantity: number

  @ApiProperty({ nullable: true })
  discount: number | null

  @ApiProperty({ nullable: true })
  product: ProductRes | null

  @ApiProperty({ nullable: true })
  service: ServiceRes | null
}
