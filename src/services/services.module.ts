import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ServicesService } from './application/services.service'
import { ServicesController } from './infraestructure/http-server/controllers/services.controller'
import { ServicesPrismaRepositoryAdapter } from './infraestructure/adapters/services.prisma.repository.adapter'
import {
  SERVICES_REPOSITORY_PORT,
  SERVICES_SERVICE_PORT,
} from './shared/products-providers.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'

@Module({
  imports: [],
  controllers: [ServicesController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: SERVICES_SERVICE_PORT,
      useClass: ServicesService,
    },
    {
      provide: SERVICES_REPOSITORY_PORT,
      useClass: ServicesPrismaRepositoryAdapter,
    },
  ],
})
export class ServicesModule {}
