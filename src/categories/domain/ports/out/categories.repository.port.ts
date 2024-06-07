import { ICreateCategoryDto } from '../../dtos/create-category.dto'
import { IUpdateCategoryDto } from '../../dtos/update-category.dto'
import { ICategoryRes } from '../../dtos/category.res'

export interface ICategoriesRepositoryPort {
  createCategory(category: ICreateCategoryDto): Promise<ICategoryRes>
  updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<ICategoryRes>
  toggleCategoryAvailability(id: number, state: boolean): Promise<boolean>
  getCategories(): Promise<ICategoryRes[]>
  getCategoryById(id: number): Promise<ICategoryRes>
  getCategoryByName(name: string): Promise<ICategoryRes>
}
