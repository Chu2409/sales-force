import { PartialType } from '@nestjs/swagger'
import { CreateServiceReq } from './create-service.req'
import { IUpdateServiceDto } from 'src/services/domain/dtos/update-service.dto'

export class UpdateServiceReq
  extends PartialType(CreateServiceReq)
  implements IUpdateServiceDto {}
