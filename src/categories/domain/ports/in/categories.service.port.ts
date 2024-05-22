import { CategoryModel } from '../../models/category'

export interface ICategoriesServicePort {
  createCategory(model: CategoryModel): Promise<CategoryModel>
  updateCategory(id: number, model: CategoryModel): Promise<CategoryModel>
  deleteCategory(id: number): Promise<boolean>
  getCategories(): Promise<CategoryModel[]>
  getCategoryById(id: number): Promise<CategoryModel>
}
