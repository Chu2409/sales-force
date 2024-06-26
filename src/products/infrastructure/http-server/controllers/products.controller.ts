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
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProductRes } from '../models/product.res'

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, isArray: true, type: ProductRes })
  async getProducts() {
    return await this.productsService.getProducts()
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: ProductRes })
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.getProductById(id)
  }

  @Post()
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 200, type: ProductRes })
  async createProduct(@Body() product: CreateProductReq) {
    return await this.productsService.createProduct(product)
  }

  @Patch(':id')
  @Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, type: ProductRes })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductReq,
  ) {
    return await this.productsService.updateProduct(id, product)
  }

  @Patch(':id/toggle-active')
  @Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Toggle product active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleProductActive(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.toggleProductActive(id)
  }
}
