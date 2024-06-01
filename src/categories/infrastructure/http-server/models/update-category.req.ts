import { PartialType } from '@nestjs/swagger'
import { CreateCategoryReq } from './create-category.req'
import { IUpdateCategoryDto } from 'src/categories/domain/dtos/update-category.dto'

export class UpdateCategoryReq
  extends PartialType(CreateCategoryReq)
  implements IUpdateCategoryDto {}
