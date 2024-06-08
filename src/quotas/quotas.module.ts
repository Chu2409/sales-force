import { Module } from '@nestjs/common'
import { QuotasService } from './application/quotas.service'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  QUOTAS_REPOSITORY_PORT,
  QUOTAS_SERVICE_PORT,
} from './shared/quotas.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { QuotasController } from './infrastructure/http-server/controllers/quotas.controller'
import { QuotasPrismaRepositoryAdapter } from './infrastructure/adapters/quotas.prisma.repository.adapter'
import { EmployeesModule } from 'src/employees/employees.module'

@Module({
  imports: [EmployeesModule],
  controllers: [QuotasController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: QUOTAS_SERVICE_PORT,
      useClass: QuotasService,
    },
    {
      provide: QUOTAS_REPOSITORY_PORT,
      useClass: QuotasPrismaRepositoryAdapter,
    },
  ],
  exports: [QUOTAS_SERVICE_PORT],
})
export class QuotasModule {}
