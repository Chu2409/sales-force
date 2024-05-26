import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PayMethodsService } from './application/pay-methods.service'
import { PayMethodsController } from './infrastructure/http-server/controllers/pay-methods.controller'
import { PayMethodsPrismaRepositoryAdapter } from './infrastructure/adapters/pay-methods.prisma.repository.adapter'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import {
  PAY_METHODS_REPOSITORY_PORT,
  PAY_METHODS_SERVICE_PORT,
} from './shared/pay-methods-providers.consts'

@Module({
  imports: [],
  controllers: [PayMethodsController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: PAY_METHODS_SERVICE_PORT,
      useClass: PayMethodsService,
    },
    {
      provide: PAY_METHODS_REPOSITORY_PORT,
      useClass: PayMethodsPrismaRepositoryAdapter,
    },
  ],
})
export class PayMethodsModule {}
