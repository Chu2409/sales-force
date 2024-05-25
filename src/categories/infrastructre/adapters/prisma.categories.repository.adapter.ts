import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ICategoriesRepositoryPort } from 'src/categories/domain/ports/out/categories.repository.port'
import { CategoryModel } from 'src/categories/domain/models/category'

@Injectable()
export class PrismaCategoriesRepositoryAdapter
  implements ICategoriesRepositoryPort
{
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getCategories(): Promise<CategoryModel[]> {
    return await this.prismaService.category.findMany()
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    return await this.prismaService.category.findUniqueOrThrow({
      where: { id },
    })
  }

  async createCategory(category: CategoryModel): Promise<CategoryModel> {
    return await this.prismaService.category.create({
      data: {
        name: category.name,
      },
    })
  }

  async updateCategory(
    id: number,
    category: CategoryModel,
  ): Promise<CategoryModel> {
    return await this.prismaService.category.update({
      where: { id },
      data: {
        name: category.name,
      },
    })
  }

  async deleteCategory(id: number): Promise<boolean> {
    const category = await this.prismaService.category.delete({
      where: { id },
    })

    return !!category
  }
}
