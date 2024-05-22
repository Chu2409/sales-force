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

  async createCategory(model: CategoryModel): Promise<CategoryModel> {
    return this.repository.createCategory(model)
  }

  async updateCategory(
    id: number,
    model: CategoryModel,
  ): Promise<CategoryModel> {
    return this.repository.updateCategory(id, model)
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
