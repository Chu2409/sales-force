import { Module } from '@nestjs/common'
import { TransactionsService } from './application/transactions.service'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  TRANSACTIONS_REPOSITORY_PORT,
  TRANSACTIONS_SERVICE_PORT,
} from './shared/transactions.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { TransactionsController } from './infrastructure/http-server/controllers/transactions.controller'
import { TransactionsPrismaRepositoryAdapter } from './infrastructure/adapters/transactions.prisma.repository.adapter'
import { ProductsModule } from 'src/products/products.module'
import { TransactionsReportsController } from './infrastructure/http-server/controllers/transactions-reports.controller'

@Module({
  imports: [ProductsModule],
  controllers: [TransactionsController, TransactionsReportsController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: TRANSACTIONS_SERVICE_PORT,
      useClass: TransactionsService,
    },
    {
      provide: TRANSACTIONS_REPOSITORY_PORT,
      useClass: TransactionsPrismaRepositoryAdapter,
    },
  ],
})
export class TransactionsModule {}
