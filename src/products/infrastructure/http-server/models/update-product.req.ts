import { PartialType } from '@nestjs/swagger'
import { CreateProductReq } from './create-product.req'
import { IUpdateProductDto } from 'src/products/domain/dtos/update-product.dto'

export class UpdateProductReq
  extends PartialType(CreateProductReq)
  implements IUpdateProductDto {}
