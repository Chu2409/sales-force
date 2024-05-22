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
import { CreateBrandDto } from './dtos/create-brand.dto'
import { BrandsMapper } from '../mappers/brands.mapper'
import { UpdateBrandDto } from './dtos/update-brand.dto'
import { BrandsService } from 'src/brands/application/brands.service'

@Controller('brands')
export class BrandsController {
  constructor(
    @Inject('IBrandsServicePort')
    private readonly brandsService: BrandsService,
  ) {}

  @Get()
  async getBrands() {
    return await this.brandsService.getBrands()
  }

  @Get(':id')
  async getBrandById(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.getBrandById(id)
  }

  @Post()
  async createBrand(@Body() brand: CreateBrandDto) {
    return await this.brandsService.createBrand(BrandsMapper.dtoToModel(brand))
  }

  @Patch(':id')
  async updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() brand: UpdateBrandDto,
  ) {
    return await this.brandsService.updateBrand(
      id,
      BrandsMapper.dtoToModel(brand),
    )
  }

  @Delete(':id')
  async deleteBrand(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.deleteBrand(id)
  }
}
