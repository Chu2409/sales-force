import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ServicesService } from './application/services.service'
import { PrismaServicesRepositoryAdapter } from './infraestructure/adapters/out/prisma.services.repository.adapter'
import { ServicesController } from './infraestructure/adapters/in/services.controller'

@Module({
  imports: [],
  controllers: [ServicesController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IServicesServicePort',
      useClass: ServicesService,
    },
    {
      provide: 'IServicesRepositoryPort',
      useClass: PrismaServicesRepositoryAdapter,
    },
  ],
})
export class ServicesModule {}
