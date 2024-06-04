import { Module } from '@nestjs/common'
import { ConsumersService } from './application/consumers.service'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  CONSUMERS_REPOSITORY_PORT,
  CONSUMERS_SERVICE_PORT,
} from './shared/consumers-providers.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ConsumersController } from './infrastructure/http-server/controllers/consumers.controller'
import { ConsumersPrismaRepositoryAdapter } from './infrastructure/adapters/consumers.prisma.repository.adapter'
import { LocationsModule } from 'src/locations/locations.module'

@Module({
  imports: [LocationsModule],
  controllers: [ConsumersController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: CONSUMERS_SERVICE_PORT,
      useClass: ConsumersService,
    },
    {
      provide: CONSUMERS_REPOSITORY_PORT,
      useClass: ConsumersPrismaRepositoryAdapter,
    },
  ],
})
export class ConsumersModule {}
