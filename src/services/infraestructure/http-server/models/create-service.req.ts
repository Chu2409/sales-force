import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'
import { ICreateServiceDto } from 'src/services/domain/dtos/create-service.dto'

export class CreateServiceReq implements ICreateServiceDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  name: string

  @IsString()
  @MinLength(10)
  @ApiProperty({ minLength: 10 })
  description: string

  @IsNumber()
  @ApiProperty({ minimum: 0 })
  pricePerHour: number

  @IsBoolean()
  @ApiProperty()
  isAvailable: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isActive?: boolean
}
