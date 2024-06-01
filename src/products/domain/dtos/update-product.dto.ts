import { ICreateProductDto } from './create-product.dto'

export interface IUpdateProductDto extends Partial<ICreateProductDto> {}
