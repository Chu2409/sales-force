import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import configuration from 'config/configuration'
import { EmployeesModule } from './employees/employees.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PrismaModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
