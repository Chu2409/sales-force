import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator'
import { ICreateLocationDto } from 'src/locations/domain/dtos/create-location.dto'

export class CreateLocationReq implements ICreateLocationDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  name: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  isActive?: boolean
}
