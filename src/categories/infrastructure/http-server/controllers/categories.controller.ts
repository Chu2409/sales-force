import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { CategoriesService } from 'src/categories/application/categories.service'
import { CreateCategoryReq } from '../models/create-category.req'
import { UpdateCategoryReq } from '../models/update-category.req'
import { CATEGORIES_SERVICE_PORT } from 'src/categories/shared/categories.consts'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'

@Controller('categories')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
export class CategoriesController {
  constructor(
    @Inject(CATEGORIES_SERVICE_PORT)
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  @Auth()
  async getCategories() {
    return await this.categoriesService.getCategories()
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.getCategoryById(id)
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryReq) {
    return await this.categoriesService.createCategory(category)
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryReq,
  ) {
    return await this.categoriesService.updateCategory(id, category)
  }

  @Patch(':id/toggle-active')
  async toggleCategoryActive(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.toggleCategoryActive(id)
  }
}
