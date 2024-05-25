import { ICategoryModel } from '../models/category.model'

export interface ICreateCategoryDto extends Omit<ICategoryModel, 'id'> {}
