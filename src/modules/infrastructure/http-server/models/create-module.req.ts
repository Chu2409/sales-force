import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator'
import { ICreateModuleDto } from 'src/modules/domain/dtos/create-module.dto'

export class CreateModuleReq implements ICreateModuleDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isActive?: boolean
}
