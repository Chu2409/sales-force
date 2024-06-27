import { ApiProperty } from '@nestjs/swagger'
import { IMostSoldService } from 'src/services/domain/dtos/most-sold-service.res'

export class MostSoldService implements IMostSoldService {
  @ApiProperty()
  name: string

  @ApiProperty()
  quantity: number
}
