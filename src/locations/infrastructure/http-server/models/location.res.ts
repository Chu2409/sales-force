import { ApiProperty } from '@nestjs/swagger'
import { ILocationRes } from 'src/locations/domain/dtos/location.res'

export class LocationRes implements ILocationRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  isActive: boolean
}
