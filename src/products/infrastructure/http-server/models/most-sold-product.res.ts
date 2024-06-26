import { ApiProperty } from '@nestjs/swagger'
import { IMostSoldProduct } from 'src/products/domain/dtos/most-sold-products.res'

export class MostSoldProduct implements IMostSoldProduct {
  @ApiProperty()
  name: string

  @ApiProperty()
  quantity: number
}
