import { IProduct } from '../models/product.interface'

export interface ICreateProductDto
  extends Omit<
    IProduct,
    'id' | 'description' | 'category' | 'brand' | 'isActive'
  > {
  description?: string
  isActive?: boolean
  categoryId: number
  brandId: number
}
