import { ICategoryRes } from 'src/categories/domain/dtos/category.res'
import { IProductModel } from '../models/product.model'
import { IBrandRes } from 'src/brands/domain/dtos/brand.res'

export interface IProductRes extends Omit<IProductModel, 'category' | 'brand'> {
  category: ICategoryRes
  brand: IBrandRes
}
