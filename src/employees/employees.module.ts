import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  EMPLOYEES_REPOSITORY_PORT,
  EMPLOYEES_SERVICE_PORT,
} from './shared/employees.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { EmployeesController } from './infrastructure/http-server/controllers/employees.controller'
import { EmployeesService } from './application/employees.service'
import { EmployeesPrismaRepositoryAdapter } from './infrastructure/adapters/employees.prisma.repository.adapter'
import { ModulesModule } from 'src/modules/modules.module'
import { LocationsModule } from 'src/locations/locations.module'

@Module({
  imports: [ModulesModule, LocationsModule],
  controllers: [EmployeesController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: EMPLOYEES_SERVICE_PORT,
      useClass: EmployeesService,
    },
    {
      provide: EMPLOYEES_REPOSITORY_PORT,
      useClass: EmployeesPrismaRepositoryAdapter,
    },
  ],
  exports: [EMPLOYEES_SERVICE_PORT],
})
export class EmployeesModule {}
