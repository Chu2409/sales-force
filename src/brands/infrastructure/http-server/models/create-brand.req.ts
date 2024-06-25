import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator'
import { ICreateBrandDto } from 'src/brands/domain/dtos/create-brand.dto'

export class CreateBrandReq implements ICreateBrandDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  isActive?: boolean
}
