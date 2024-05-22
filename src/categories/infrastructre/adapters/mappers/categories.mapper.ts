import { Category } from '@prisma/client'
import { CreateCategoryDto } from '../in/dtos/create-category.dto'
import { UpdateCategoryDto } from '../in/dtos/update-category.dto'
import { CategoryModel } from 'src/categories/domain/models/category'

export class CategoriesMapper {
  public static toModel(category: Category): CategoryModel {
    return new CategoryModel(category.id, category.name)
  }

  public static toModels(categories: Category[]): CategoryModel[] {
    return categories.map((category) => this.toModel(category))
  }

  public static dtoToModel(
    dto: CreateCategoryDto | UpdateCategoryDto,
  ): CategoryModel {
    return new CategoryModel(undefined, dto.name)
  }
}
