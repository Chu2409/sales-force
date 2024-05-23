import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsOptional()
  @IsString()
  description?: string | null

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
