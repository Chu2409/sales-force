import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ICategoriesRepositoryPort } from 'src/categories/domain/ports/out/categories.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ICategoryRes } from 'src/categories/domain/dtos/category.res'
import { ICreateCategoryDto } from 'src/categories/domain/dtos/create-category.dto'
import { IUpdateCategoryDto } from 'src/categories/domain/dtos/update-category.dto'

@Injectable()
export class PrismaCategoriesRepositoryAdapter
  implements ICategoriesRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getCategories(): Promise<ICategoryRes[]> {
    return await this.prismaService.category.findMany()
  }

  async getCategoryById(id: number): Promise<ICategoryRes> {
    return await this.prismaService.category.findUniqueOrThrow({
      where: { id },
    })
  }

  async createCategory(category: ICreateCategoryDto): Promise<ICategoryRes> {
    return await this.prismaService.category.create({
      data: {
        name: category.name,
      },
    })
  }

  async updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<ICategoryRes> {
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
