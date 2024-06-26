import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator'
import { ICreateProductDto } from 'src/products/domain/dtos/create-product.dto'

export class CreateProductReq implements ICreateProductDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  name: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string

  @IsNumber()
  @IsPositive()
  @ApiProperty({ minimum: 0 })
  price: number

  @IsNumber()
  @Min(0)
  @ApiProperty({ minimum: 0 })
  stock: number

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isActive?: boolean

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  categoryId: number

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  brandId: number
}
