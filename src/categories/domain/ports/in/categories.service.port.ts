import { ICreateCategoryDto } from '../../dtos/create-category.dto'
import { IUpdateCategoryDto } from '../../dtos/update-category.dto'
import { CategoryModel } from '../../models/category'

export interface ICategoriesServicePort {
  createCategory(category: ICreateCategoryDto): Promise<CategoryModel>
  updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<CategoryModel>
  deleteCategory(id: number): Promise<boolean>
  getCategories(): Promise<CategoryModel[]>
  getCategoryById(id: number): Promise<CategoryModel>
}
