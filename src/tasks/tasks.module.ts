import { Module } from '@nestjs/common'
import { TasksService } from './application/tasks.service'
import { TasksController } from './infrastructure/http-server/controllers/tasks.controller'
import { TasksPrismaRepositoryAdapter } from './infrastructure/adapters/tasks.prisma.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  TASKS_REPOSITORY_PORT,
  TASKS_SERVICE_PORT,
} from './shared/tasks.consts'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { DelegationsModule } from 'src/delegations/delegations.module'
import { EmployeesModule } from 'src/employees/employees.module'
import { ConsumersModule } from 'src/consumers/consumers.module'

@Module({
  imports: [DelegationsModule, EmployeesModule, ConsumersModule],
  controllers: [TasksController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: TASKS_SERVICE_PORT,
      useClass: TasksService,
    },
    {
      provide: TASKS_REPOSITORY_PORT,
      useClass: TasksPrismaRepositoryAdapter,
    },
  ],
})
export class TasksModule {}
