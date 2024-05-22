import { CategoryModel } from '../../models/category'

export interface ICategoriesRepositoryPort {
  createCategory(category: CategoryModel): Promise<CategoryModel>
  updateCategory(id: number, category: CategoryModel): Promise<CategoryModel>
  deleteCategory(id: number): Promise<boolean>
  getCategories(): Promise<CategoryModel[]>
  getCategoryById(id: number): Promise<CategoryModel>
}
