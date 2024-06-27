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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoryRes } from '../models/category.res'

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(
    @Inject(CATEGORIES_SERVICE_PORT)
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: CategoryRes, isArray: true })
  async getCategories() {
    return await this.categoriesService.getCategories()
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, type: CategoryRes })
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.getCategoryById(id)
  }

  @Post()
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, type: CategoryRes })
  async createCategory(@Body() category: CreateCategoryReq) {
    return await this.categoriesService.createCategory(category)
  }

  @Patch(':id')
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: CategoryRes })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryReq,
  ) {
    return await this.categoriesService.updateCategory(id, category)
  }

  @Patch(':id/toggle-active')
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Toggle category active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleCategoryActive(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.toggleCategoryActive(id)
  }
}
