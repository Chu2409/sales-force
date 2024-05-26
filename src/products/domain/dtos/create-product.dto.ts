import { IProductModel } from '../models/product.model'

export interface ICreateProductDto
  extends Omit<IProductModel, 'id' | 'description' | 'category' | 'brand'> {
  description?: string
  categoryId: number
  brandId: number
}
