import { Controller, Get, Inject } from '@nestjs/common'
import { ProductsService } from 'src/products/application/products.service'
import { PRODUCTS_SERVICE_PORT } from 'src/products/shared/products.consts'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IMostSoldProduct } from 'src/products/domain/dtos/most-sold-products.res'
import { MostSoldProduct } from '../models/most-sold-products.res'

@Controller('products/reports')
@ApiTags('Products Reports')
export class ProductsReportsController {
  constructor(
    @Inject(PRODUCTS_SERVICE_PORT)
    private readonly productsService: ProductsService,
  ) {}

  @Get('most-sold')
  @ApiOperation({ summary: 'Get top 10 most sold products' })
  @ApiResponse({ status: 200, isArray: true, type: MostSoldProduct })
  async getMostSoldProducts(): Promise<IMostSoldProduct[]> {
    return this.productsService.getMostSoldProducts()
  }
}
