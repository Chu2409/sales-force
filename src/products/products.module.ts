import { Module } from '@nestjs/common'
import { ProductsService } from './application/products.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductsController } from './infrastructre/http-server/controllers/products.controller'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { PrismaProductsRepositoryAdapter } from './infrastructre/adapters/prisma.products.repository.adapter'
import {
  PRODUCTS_REPOSITORY_PORT,
  PRODUCTS_SERVICE_PORT,
} from './shared/products-providers.consts'

@Module({
  imports: [],
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
      useClass: PrismaProductsRepositoryAdapter,
    },
  ],
})
export class ProductsModule {}
