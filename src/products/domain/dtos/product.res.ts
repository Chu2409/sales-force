import { ICategoryRes } from 'src/categories/domain/dtos/category.res'
import { IProduct } from '../models/product.interface'
import { IBrandRes } from 'src/brands/domain/dtos/brand.res'

export interface IProductRes extends Omit<IProduct, 'category' | 'brand'> {
  category: ICategoryRes
  brand: IBrandRes
}
