import { PartialType } from '@nestjs/swagger'
import { CreateBrandReq } from './create-brand.req'

export class UpdateBrandReq extends PartialType(CreateBrandReq) {}
