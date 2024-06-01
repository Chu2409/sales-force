import { PartialType } from '@nestjs/swagger'
import { CreateBrandReq } from './create-brand.req'
import { IUpdateBrandDto } from 'src/brands/domain/dtos/update-brand.dto'

export class UpdateBrandReq
  extends PartialType(CreateBrandReq)
  implements IUpdateBrandDto {}
