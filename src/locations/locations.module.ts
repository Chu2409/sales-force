import { Module } from '@nestjs/common'
import { LocationsService } from './application/locations.service'
import { LocationsController } from './infrastructre/adapters/in/locations.controller'
import { PrismaLocationsRepositoryAdapter } from './infrastructre/adapters/out/prisma.locations.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [LocationsController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'ILocationsServicePort',
      useClass: LocationsService,
    },
    {
      provide: 'ILocationsRepositoryPort',
      useClass: PrismaLocationsRepositoryAdapter,
    },
  ],
})
export class LocationsModule {}
