import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator'
import { ICreateCategoryDto } from 'src/categories/domain/dtos/create-category.dto'

export class CreateCategoryReq implements ICreateCategoryDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  name: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  isActive?: boolean
}
