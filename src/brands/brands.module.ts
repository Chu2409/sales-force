import { Module } from '@nestjs/common'
import { BrandsService } from './application/brands.service'
import { BrandsController } from './infrastructure/http-server/controllers/brands.controller'
import { PrismaBrandsRepositoryAdapter } from './infrastructure/adapters/domain/prisma.brands.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  BRANDS_REPOSITORY_PORT,
  BRANDS_SERVICE_PORT,
} from './shared/brands-providers.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'

@Module({
  imports: [],
  controllers: [BrandsController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: BRANDS_SERVICE_PORT,
      useClass: BrandsService,
    },
    {
      provide: BRANDS_REPOSITORY_PORT,
      useClass: PrismaBrandsRepositoryAdapter,
    },
  ],
})
export class BrandsModule {}
