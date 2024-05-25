import { Module } from '@nestjs/common'
import { ConsumersService } from './application/consumers.service'
import { ConsumersController } from './infrastructure/adapters/in/consumers.controller'
import { PrismaConsumersRepositoryAdapter } from './infrastructure/adapters/out/prisma.consumers.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [ConsumersController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IConsumersServicePort',
      useClass: ConsumersService,
    },
    {
      provide: 'IConsumersRepositoryPort',
      useClass: PrismaConsumersRepositoryAdapter,
    },
  ],
})
export class ConsumersModule {}
