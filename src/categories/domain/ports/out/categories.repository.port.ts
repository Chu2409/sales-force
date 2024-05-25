import { IBrandRes } from 'src/brands/domain/dtos/brand.res'
import { ICreateCategoryDto } from '../../dtos/create-category.dto'
import { IUpdateCategoryDto } from '../../dtos/update-category.dto'

export interface ICategoriesRepositoryPort {
  createCategory(category: ICreateCategoryDto): Promise<IBrandRes>
  updateCategory(id: number, category: IUpdateCategoryDto): Promise<IBrandRes>
  deleteCategory(id: number): Promise<boolean>
  getCategories(): Promise<IBrandRes[]>
  getCategoryById(id: number): Promise<IBrandRes>
}
