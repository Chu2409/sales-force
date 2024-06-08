import { Module } from '@nestjs/common'
import { ProductsService } from './application/products.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductsController } from './infrastructure/http-server/controllers/products.controller'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ProductsPrismaRepositoryAdapter } from './infrastructure/adapters/products.prisma.repository.adapter'
import {
  PRODUCTS_REPOSITORY_PORT,
  PRODUCTS_SERVICE_PORT,
} from './shared/products.consts'
import { CategoriesModule } from 'src/categories/categories.module'
import { BrandsModule } from 'src/brands/brands.module'

@Module({
  imports: [CategoriesModule, BrandsModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: PRODUCTS_SERVICE_PORT,
      useClass: ProductsService,
    },
    {
      provide: PRODUCTS_REPOSITORY_PORT,
      useClass: ProductsPrismaRepositoryAdapter,
    },
  ],
})
export class ProductsModule {}
