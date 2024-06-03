import { PartialType } from '@nestjs/swagger'
import { CreateModuleReq } from './create-module.req'
import { IUpdateModuleDto } from 'src/modules/domain/dtos/update-module.dto'

export class UpdateModuleReq
  extends PartialType(CreateModuleReq)
  implements IUpdateModuleDto {}
