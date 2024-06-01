import { IProduct } from '../models/product.interface'

export interface ICreateProductDto
  extends Omit<IProduct, 'id' | 'description' | 'category' | 'brand'> {
  description?: string
  categoryId: number
  brandId: number
}
