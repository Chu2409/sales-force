import { Module } from '@nestjs/common'
import { CategoriesService } from './application/categories.service'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  CATEGORIES_REPOSITORY_PORT,
  CATEGORIES_SERVICE_PORT,
} from './shared/categories-providers.consts'
import { CategoriesController } from './infrastructure/http-server/controllers/categories.controller'
import { PrismaCategoriesRepositoryAdapter } from './infrastructure/adapters/prisma.categories.repository.adapter'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: CATEGORIES_SERVICE_PORT,
      useClass: CategoriesService,
    },
    {
      provide: CATEGORIES_REPOSITORY_PORT,
      useClass: PrismaCategoriesRepositoryAdapter,
    },
  ],
})
export class CategoriesModule {}
