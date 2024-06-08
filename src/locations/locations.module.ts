import { Module } from '@nestjs/common'
import { LocationsService } from './application/locations.service'
import { LocationsController } from './infrastructure/http-server/controllers/locations.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import {
  LOCATIONS_REPOSITORY_PORT,
  LOCATIONS_SERVICE_PORT,
} from './shared/locations.consts'
import { LocationsPrismaRepositoryAdapter } from './infrastructure/adapters/locations.prisma.repository.adapter'

@Module({
  imports: [],
  controllers: [LocationsController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: LOCATIONS_SERVICE_PORT,
      useClass: LocationsService,
    },
    {
      provide: LOCATIONS_REPOSITORY_PORT,
      useClass: LocationsPrismaRepositoryAdapter,
    },
  ],
  exports: [LOCATIONS_SERVICE_PORT],
})
export class LocationsModule {}
