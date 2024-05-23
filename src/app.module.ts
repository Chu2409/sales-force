import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import configuration from 'config/configuration'
import { EmployeesModule } from './employees/employees.module'
import { CategoriesModule } from './categories/categories.module'
import { BrandsModule } from './brands/brands.module'
import { ServicesModule } from './services/services.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PrismaModule,
    EmployeesModule,
    CategoriesModule,
    BrandsModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
