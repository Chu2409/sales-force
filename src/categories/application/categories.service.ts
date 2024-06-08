import { Inject, Injectable } from '@nestjs/common'
import { ICategoriesServicePort } from '../domain/ports/in/categories.service.port'
import { ICategoriesRepositoryPort } from '../domain/ports/out/categories.repository.port'
import { ICreateCategoryDto } from '../domain/dtos/create-category.dto'
import { IUpdateCategoryDto } from '../domain/dtos/update-category.dto'
import { CATEGORIES_REPOSITORY_PORT } from '../shared/categories.consts'
import { ICategoryRes } from '../domain/dtos/category.res'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'

@Injectable()
export class CategoriesService implements ICategoriesServicePort {
  constructor(
    @Inject(CATEGORIES_REPOSITORY_PORT)
    private readonly repository: ICategoriesRepositoryPort,
  ) {}

  async createCategory(category: ICreateCategoryDto): Promise<ICategoryRes> {
    const categoryExists = await this.repository.getCategoryByName(
      category.name,
    )
    if (categoryExists)
      throw new AppError('Category already exists', Errors.BAD_REQUEST)

    const createdCategory = await this.repository.createCategory(category)
    if (!createdCategory)
      throw new AppError('Category not created', Errors.INTERNAL_SERVER_ERROR)

    return createdCategory
  }

  async updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<ICategoryRes> {
    await this.getCategoryById(id)

    const categoryExists = await this.repository.getCategoryByName(
      category.name,
    )
    if (categoryExists && categoryExists.id !== id)
      throw new AppError('Category already exists', Errors.BAD_REQUEST)

    const updatedCategory = await this.repository.updateCategory(id, category)
    if (!updatedCategory)
      throw new AppError('Category not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedCategory
  }

  async toggleCategoryActive(id: number): Promise<boolean> {
    const category = await this.getCategoryById(id)

    return await this.repository.setCategoryActive(id, !category.isActive)
  }

  async getCategories(): Promise<ICategoryRes[]> {
    return await this.repository.getCategories()
  }

  async getCategoryById(id: number): Promise<ICategoryRes> {
    const category = await this.repository.getCategoryById(id)
    if (!category) throw new AppError('Category not found', Errors.NOT_FOUND)

    return category
  }
}
