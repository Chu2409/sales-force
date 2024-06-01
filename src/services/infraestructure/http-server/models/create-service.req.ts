import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator'
import { ICreateServiceDto } from 'src/services/domain/dtos/create-service.dto'

export class CreateServiceReq implements ICreateServiceDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  @MinLength(10)
  description: string

  @IsNumber()
  pricePerHour: number

  @IsBoolean()
  isAvailable: boolean
}
