import { ICategory } from '../models/category.interface'

export interface ICreateCategoryDto extends Omit<ICategory, 'id' | 'isActive'> {
  isActive?: boolean
}
