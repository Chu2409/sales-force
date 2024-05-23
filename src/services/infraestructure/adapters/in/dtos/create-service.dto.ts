import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateServiceDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  pricePerHour: number

  @IsBoolean()
  isAvaliable: boolean
}
