import { IBrandModel } from 'src/brands/domain/models/brand.model'
import { ICategoryModel } from 'src/categories/domain/models/category.model'

export interface IProductModel {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  category: ICategoryModel
  brand: IBrandModel
}
