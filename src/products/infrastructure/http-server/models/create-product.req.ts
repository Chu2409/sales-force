import {
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
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsNumber()
  @Min(0)
  stock: number

  @IsNumber()
  @IsPositive()
  categoryId: number

  @IsNumber()
  @IsPositive()
  brandId: number
}
