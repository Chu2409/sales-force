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
import { ProductsService } from 'src/products/application/products.service'
import { CreateProductReq } from '../models/create-product.req'
import { UpdateProductReq } from '../models/update-product.req'
import { PRODUCTS_SERVICE_PORT } from 'src/products/shared/products.consts'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
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
  async createProduct(@Body() product: CreateProductReq) {
    return await this.productsService.createProduct(product)
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductReq,
  ) {
    return await this.productsService.updateProduct(id, product)
  }

  @Patch(':id/toggle-active')
  async toggleProductActive(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.toggleProductActive(id)
  }
}
