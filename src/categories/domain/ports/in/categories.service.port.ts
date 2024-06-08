import { ICreateCategoryDto } from '../../dtos/create-category.dto'
import { IUpdateCategoryDto } from '../../dtos/update-category.dto'
import { ICategoryRes } from '../../dtos/category.res'

export interface ICategoriesServicePort {
  createCategory(category: ICreateCategoryDto): Promise<ICategoryRes>
  updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<ICategoryRes>
  toggleCategoryActive(id: number): Promise<boolean>
  getCategories(): Promise<ICategoryRes[]>
  getCategoryById(id: number): Promise<ICategoryRes>
}
