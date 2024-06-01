import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'
import { ICreateLocationDto } from 'src/locations/domain/dtos/create-location.dto'
import { LocationType } from 'src/locations/domain/models/location.interface'

export class CreateLocationReq implements ICreateLocationDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsEnum(LocationType)
  type: LocationType

  @IsNumber()
  @IsOptional()
  parentId?: number
}
