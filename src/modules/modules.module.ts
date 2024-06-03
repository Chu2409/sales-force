import { Module } from '@nestjs/common'
import { ModulesService } from './application/modules.service'
import { ModulesController } from './infrastructure/http-server/controllers/modules.controller'
import { ModulesPrismaRepositoryAdapter } from './infrastructure/adapters/modules.prisma.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  MODULES_REPOSITORY_PORT,
  MODULES_SERVICE_PORT,
} from './shared/modules-providers.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'

@Module({
  imports: [],
  controllers: [ModulesController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: MODULES_SERVICE_PORT,
      useClass: ModulesService,
    },
    {
      provide: MODULES_REPOSITORY_PORT,
      useClass: ModulesPrismaRepositoryAdapter,
    },
  ],
})
export class ModulesModule {}
