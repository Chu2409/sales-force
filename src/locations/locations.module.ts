import { Module } from '@nestjs/common'
import { LocationsService } from './application/locations.service'
import { LocationsController } from './infrastructure/http-server/controllers/locations.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import {
  LOCATIONS_REPOSITORY_PORT,
  LOCATIONS_SERVICE_PORT,
} from './shared/locations-providers.consts'
import { PrismaLocationsRepositoryAdapter } from './infrastructure/adapters/prisma.locations.repository.adapter'

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
      useClass: PrismaLocationsRepositoryAdapter,
    },
  ],
})
export class LocationsModule {}
