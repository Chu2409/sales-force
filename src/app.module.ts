import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import configuration from 'config/configuration'
import { EmployeesModule } from './employees/employees.module'
import { CategoriesModule } from './categories/categories.module'
import { BrandsModule } from './brands/brands.module'
import { ProductsModule } from './products/products.module'
import { ConsumersModule } from './consumers/consumers.module'
import { LocationsModule } from './locations/locations.module'
import { ServicesModule } from './services/services.module'
import { PaymentMethodsModule } from './payment-methods/payment-methods.module'

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
    ProductsModule,
    ConsumersModule,
    LocationsModule,
    PaymentMethodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
