import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateCategoryDto } from './dtos/create-category.dto'
import { CategoriesMapper } from '../mappers/categories.mapper'
import { CategoriesService } from 'src/categories/application/categories.service'
import { UpdateCategoryDto } from './dtos/update-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject('ICategoriesServicePort')
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories()
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.getCategoryById(id)
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoriesService.createCategory(
      CategoriesMapper.dtoToModel(category),
    )
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(
      id,
      CategoriesMapper.dtoToModel(category),
    )
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.deleteCategory(id)
  }
}
