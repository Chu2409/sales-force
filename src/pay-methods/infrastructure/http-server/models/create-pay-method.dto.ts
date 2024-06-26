import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator'
import { ICreatePayMethodDto } from 'src/pay-methods/domain/dtos/create-pay-method.dto'

export class CreatePayMethodReq implements ICreatePayMethodDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  name: string

  @Min(0)
  @ApiProperty({ minimum: 0 })
  tax: number

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isActive?: boolean
}
