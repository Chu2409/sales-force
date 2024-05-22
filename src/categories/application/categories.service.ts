import { Inject, Injectable } from '@nestjs/common'
import { ICategoriesServicePort } from '../domain/ports/in/categories.service.port'
import { ICategoriesRepositoryPort } from '../domain/ports/out/categories.repository.port'
import { CategoryModel } from '../domain/models/category'

@Injectable()
export class CategoriesService implements ICategoriesServicePort {
  constructor(
    @Inject('ICategoriesRepositoryPort')
    private readonly repository: ICategoriesRepositoryPort,
  ) {}

  async createCategory(category: CategoryModel): Promise<CategoryModel> {
    return this.repository.createCategory(category)
  }

  async updateCategory(
    id: number,
    category: CategoryModel,
  ): Promise<CategoryModel> {
    return this.repository.updateCategory(id, category)
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
