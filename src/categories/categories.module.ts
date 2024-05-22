import { Module } from '@nestjs/common'
import { CategoriesService } from './application/categories.service'
import { CategoriesController } from './infrastructre/adapters/in/categories.controller'
import { PrismaCategoriesRepositoryAdapter } from './infrastructre/adapters/out/prisma.categories.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'CategoriesService',
      useClass: CategoriesService,
    },
    {
      provide: 'ICategoriesRepositoryPort',
      useClass: PrismaCategoriesRepositoryAdapter,
    },
  ],
})
export class CategoriesModule {}
