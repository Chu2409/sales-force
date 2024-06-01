import { IBrand } from 'src/brands/domain/models/brand.interface'
import { ICategory } from 'src/categories/domain/models/category.interface'

export interface IProduct {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  category: ICategory
  brand: IBrand
}
