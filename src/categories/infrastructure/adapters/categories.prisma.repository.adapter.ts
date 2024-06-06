import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
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
    const category = await this.prismaService.category.findUnique({
      where: { id },
    })

    if (!category) throw new NotFoundException('Category not found')

    return category
  }

  async createCategory(category: ICreateCategoryDto): Promise<ICategoryRes> {
    const categoryExists = await this.prismaService.category.findFirst({
      where: { name: category.name },
    })
    if (categoryExists) throw new BadRequestException('Category already exists')

    return await this.prismaService.category.create({
      data: category,
    })
  }

  async updateCategory(
    id: number,
    category: IUpdateCategoryDto,
  ): Promise<ICategoryRes> {
    await this.getCategoryById(id)

    const categoryExists = await this.prismaService.category.findFirst({
      where: { name: category.name, id: { not: id } },
    })
    if (categoryExists) throw new BadRequestException('Category already exists')

    return await this.prismaService.category.update({
      where: { id },
      data: category,
    })
  }

  async toggleCategoryAvailability(id: number): Promise<boolean> {
    const categoryToUpdate = await this.getCategoryById(id)

    const category = await this.prismaService.category.update({
      where: { id },
      data: { isActive: !categoryToUpdate.isActive },
    })

    return !!category
  }
}
