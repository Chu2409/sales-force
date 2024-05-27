import { PartialType } from '@nestjs/swagger'
import { CreateProductReq } from './create-product.req'

export class UpdateProductReq extends PartialType(CreateProductReq) {}
