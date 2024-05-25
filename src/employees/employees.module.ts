import { Module } from '@nestjs/common'
import { EmployeesService } from './application/employees.service'
import { EmployeesController } from './infrastructure/adapters/in/employees.controller'
import { PrismaEmployeesRepositoryAdapter } from './infrastructure/adapters/out/prisma.employees.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IEmployeesServicePort',
      useClass: EmployeesService,
    },
    {
      provide: 'IEmployeesRepositoryPort',
      useClass: PrismaEmployeesRepositoryAdapter,
    },
  ],
})
export class EmployeesModule {}
