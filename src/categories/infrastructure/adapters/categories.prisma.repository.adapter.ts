import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ICategoriesRepositoryPort } from 'src/categories/domain/ports/out/categories.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ICategoryRes } from 'src/categories/domain/dtos/category.res'
import { ICreateCategoryDto } from 'src/categories/domain/dtos/create-category.dto'
import { IUpdateCategoryDto } from 'src/categories/domain/dtos/update-category.dto'

@Injectable()
export class CategoriesPrismaRepositoryAdapter
  implements ICategoriesRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getCategories(): Promise<ICategoryRes[]> {
    return await this.prismaService.category.findMany({
      orderBy: { name: 'asc' },
    })
  }

  async getCategoryById(id: number): Promise<ICategoryRes> {
    return await this.prismaService.category.findUnique({
      where: { id },
    })
  }

  async getCategoryByName(name: string): Promise<ICategoryRes> {
    return await this.prismaService.category.findUnique({
      where: { name },
    })
  }

  async createCategory(category: ICreateCategoryDto): Promise<ICategoryRes> {
    return await this.prismaService.category.create({
      data: category,
    })
  }

  async updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<ICategoryRes> {
    return await this.prismaService.category.update({
      where: { id },
      data: category,
    })
  }

  async setCategoryActive(id: number, state: boolean): Promise<boolean> {
    const category = await this.prismaService.category.update({
      where: { id },
      data: { isActive: state },
    })

    return !!category
  }
}
