import { ApiProperty } from '@nestjs/swagger'
import { IBrandRes } from 'src/brands/domain/dtos/brand.res'

export class BrandRes implements IBrandRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  isActive: boolean
}
