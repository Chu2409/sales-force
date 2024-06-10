import { Module } from '@nestjs/common'
import { DelegationsService } from './application/delegations.service'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  DELEGATIONS_REPOSITORY_PORT,
  DELEGATIONS_SERVICE_PORT,
} from './shared/delegations.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { DelegationsPrismaRepositoryAdapter } from './infrastructure/adapters/delegations.prisma.repository.adapter'
import { DelegationsController } from './infrastructure/http-server/controllers/delegations.controller'
import { EmployeesModule } from 'src/employees/employees.module'
import { ConsumersModule } from 'src/consumers/consumers.module'

@Module({
  imports: [EmployeesModule, ConsumersModule],
  controllers: [DelegationsController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: DELEGATIONS_SERVICE_PORT,
      useClass: DelegationsService,
    },
    {
      provide: DELEGATIONS_REPOSITORY_PORT,
      useClass: DelegationsPrismaRepositoryAdapter,
    },
  ],
})
export class DelegationsModule {}
