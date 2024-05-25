import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'
import { LocationTypeModel } from 'src/locations/domain/models/location'

export class CreateLocationReq {
  @IsString()
  @MinLength(3)
  name: string

  @IsEnum(LocationTypeModel)
  type: LocationTypeModel

  @IsNumber()
  @IsOptional()
  parentId?: number
}
