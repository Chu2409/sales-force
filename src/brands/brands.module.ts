import { Module } from '@nestjs/common'
import { BrandsService } from './application/brands.service'
import { BrandsController } from './infrastructre/adapters/in/brands.controller'
import { PrismaBrandsRepositoryAdapter } from './infrastructre/adapters/out/prisma.brands.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [BrandsController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IBrandsServicePort',
      useClass: BrandsService,
    },
    {
      provide: 'IBrandsRepositoryPort',
      useClass: PrismaBrandsRepositoryAdapter,
    },
  ],
})
export class BrandsModule {}
