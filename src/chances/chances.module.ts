import { Module } from '@nestjs/common'
import { ChancesService } from './application/chances.service'
import { ChancesController } from './infrastructure/http-server/controllers/chances.controller'
import { ChancesPrismaRepositoryAdapter } from './infrastructure/adapters/chances.prisma.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  CHANCES_REPOSITORY_PORT,
  CHANCES_SERVICE_PORT,
} from './shared/chances.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { DelegationsModule } from 'src/delegations/delegations.module'

@Module({
  imports: [DelegationsModule],
  controllers: [ChancesController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: CHANCES_SERVICE_PORT,
      useClass: ChancesService,
    },
    {
      provide: CHANCES_REPOSITORY_PORT,
      useClass: ChancesPrismaRepositoryAdapter,
    },
  ],
})
export class ChancesModule {}
