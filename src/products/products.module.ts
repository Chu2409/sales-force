import { Module } from '@nestjs/common'
import { ProductsService } from './application/products.service'
import { ProductsController } from './infrastructre/adapters/in/products.controller'
import { PrismaProductsRepositoryAdapter } from './infrastructre/adapters/out/prisma.products.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IProductsServicePort',
      useClass: ProductsService,
    },
    {
      provide: 'IProductsRepositoryPort',
      useClass: PrismaProductsRepositoryAdapter,
    },
  ],
})
export class ProductsModule {}
