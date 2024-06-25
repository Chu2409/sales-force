import { ApiProperty } from '@nestjs/swagger'
import { ICategoryRes } from 'src/categories/domain/dtos/category.res'

export class CategoryRes implements ICategoryRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  isActive: boolean
}
