import { Inject, Injectable } from '@nestjs/common'
import { ICategoriesServicePort } from '../domain/ports/in/categories.service.port'
import { ICategoriesRepositoryPort } from '../domain/ports/out/categories.repository.port'
import { CategoryModel } from '../domain/models/category'
import { ICreateCategoryDto } from '../domain/dtos/create-category.dto'
import { IUpdateCategoryDto } from '../domain/dtos/update-category.dto'
import { CATEGORIES_REPOSITORY_PORT } from '../shared/categories-providers.consts'

@Injectable()
export class CategoriesService implements ICategoriesServicePort {
  constructor(
    @Inject(CATEGORIES_REPOSITORY_PORT)
    private readonly repository: ICategoriesRepositoryPort,
  ) {}

  async createCategory(category: ICreateCategoryDto): Promise<CategoryModel> {
    return this.repository.createCategory(
      CategoryModel.create({
        name: category.name,
      }),
    )
  }

  async updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<CategoryModel> {
    return this.repository.updateCategory(
      id,
      CategoryModel.create({
        name: category.name,
      }),
    )
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.repository.deleteCategory(id)
  }

  async getCategories(): Promise<CategoryModel[]> {
    return this.repository.getCategories()
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    return this.repository.getCategoryById(id)
  }
}
