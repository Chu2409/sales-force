import { Inject, Injectable } from '@nestjs/common'
import { ICategoriesServicePort } from '../domain/ports/in/categories.service.port'
import { ICategoriesRepositoryPort } from '../domain/ports/out/categories.repository.port'
import { ICreateCategoryDto } from '../domain/dtos/create-category.dto'
import { IUpdateCategoryDto } from '../domain/dtos/update-category.dto'
import { CATEGORIES_REPOSITORY_PORT } from '../shared/categories-providers.consts'
import { ICategoryRes } from '../domain/dtos/category.res'

@Injectable()
export class CategoriesService implements ICategoriesServicePort {
  constructor(
    @Inject(CATEGORIES_REPOSITORY_PORT)
    private readonly repository: ICategoriesRepositoryPort,
  ) {}

  async createCategory(category: ICreateCategoryDto): Promise<ICategoryRes> {
    return await this.repository.createCategory(category)
  }

  async updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<ICategoryRes> {
    return await this.repository.updateCategory(id, category)
  }

  async deleteCategory(id: number): Promise<boolean> {
    return await this.repository.toggleCategoryAvailability(id)
  }

  async getCategories(): Promise<ICategoryRes[]> {
    return await this.repository.getCategories()
  }

  async getCategoryById(id: number): Promise<ICategoryRes> {
    return await this.repository.getCategoryById(id)
  }
}
