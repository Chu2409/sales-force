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
import { CreateBrandReq } from '../models/create-brand.req'
import { UpdateBrandReq } from '../models/update-brand.req'
import { BrandsService } from 'src/brands/application/brands.service'
import { BRANDS_SERVICE_PORT } from 'src/brands/shared/brands.consts'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BrandRes } from '../models/brand.res'

@Controller('brands')
@ApiTags('Brands')
export class BrandsController {
  constructor(
    @Inject(BRANDS_SERVICE_PORT)
    private readonly brandsService: BrandsService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, type: BrandRes, isArray: true })
  async getBrands() {
    return await this.brandsService.getBrands()
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get brand by id' })
  @ApiResponse({ status: 200, type: BrandRes })
  async getBrandById(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.getBrandById(id)
  }

  @Post()
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Create brand' })
  @ApiResponse({ status: 201, type: BrandRes })
  async createBrand(@Body() brand: CreateBrandReq) {
    return await this.brandsService.createBrand(brand)
  }

  @Patch(':id')
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Update brand' })
  @ApiResponse({ status: 200, type: BrandRes })
  async updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() brand: UpdateBrandReq,
  ) {
    return await this.brandsService.updateBrand(id, brand)
  }

  @Patch(':id/toggle-active')
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Toggle brand active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleBrandActive(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.toggleBrandActive(id)
  }
}
