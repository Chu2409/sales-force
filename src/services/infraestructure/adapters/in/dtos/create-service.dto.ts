import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator'

export class CreateServiceDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  description: string

  @IsNumber()
  pricePerHour: number

  @IsBoolean()
  isAvaliable: boolean
}
