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

@Controller('brands')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
export class BrandsController {
  constructor(
    @Inject(BRANDS_SERVICE_PORT)
    private readonly brandsService: BrandsService,
  ) {}

  @Get()
  @Auth()
  async getBrands() {
    return await this.brandsService.getBrands()
  }

  @Get(':id')
  async getBrandById(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.getBrandById(id)
  }

  @Post()
  async createBrand(@Body() brand: CreateBrandReq) {
    return await this.brandsService.createBrand(brand)
  }

  @Patch(':id')
  async updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() brand: UpdateBrandReq,
  ) {
    return await this.brandsService.updateBrand(id, brand)
  }

  @Patch(':id/toggle-active')
  async toggleBrandActive(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.toggleBrandActive(id)
  }
}
