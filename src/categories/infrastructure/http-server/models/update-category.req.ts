import { PartialType } from '@nestjs/swagger'
import { CreateCategoryReq } from './create-category.req'

export class UpdateCategoryReq extends PartialType(CreateCategoryReq) {}
