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
import { ProductsService } from 'src/products/application/products.service'
import { CreateProductDto } from './dtos/create-product.dto'
import { UpdateProductDto } from './dtos/update-product.dto'
import { ProductsMapper } from '../mappers/products.mapper'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('IProductsServicePort')
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  async getProducts() {
    return await this.productsService.getProducts()
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.getProductById(id)
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.createProduct(
      ProductsMapper.dtoToModel(product),
    )
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(
      id,
      ProductsMapper.dtoToModel(product),
    )
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.deleteProduct(id)
  }
}
