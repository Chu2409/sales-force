import { ApiProperty } from '@nestjs/swagger'
import { BrandRes } from 'src/brands/infrastructure/http-server/models/brand.res'
import { CategoryRes } from 'src/categories/infrastructure/http-server/models/category.res'
import { IProductRes } from 'src/products/domain/dtos/product.res'

export class ProductRes implements IProductRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty({ nullable: true })
  description: string | null

  @ApiProperty()
  price: number

  @ApiProperty()
  stock: number

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  category: CategoryRes

  @ApiProperty()
  brand: BrandRes
}
