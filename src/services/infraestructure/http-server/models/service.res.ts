import { ApiProperty } from '@nestjs/swagger'
import { IServiceRes } from 'src/services/domain/dtos/service.res'

export class ServiceRes implements IServiceRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  pricePerHour: number

  @ApiProperty()
  isAvailable: boolean

  @ApiProperty()
  isActive: boolean
}
