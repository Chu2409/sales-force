import { PartialType } from '@nestjs/swagger'
import { CreateLocationReq } from './create-location.req'
import { IUpdateLocationDto } from 'src/locations/domain/dtos/update-location.dto'

export class UpdateLocationReq
  extends PartialType(CreateLocationReq)
  implements IUpdateLocationDto {}
