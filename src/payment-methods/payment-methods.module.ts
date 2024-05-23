import { Module } from '@nestjs/common'
import { PaymentMethodsController } from './infrastructre/adapters/in/payment-method.controller'
import { PrismaPaymentMethodsRepositoryAdapter } from './infrastructre/adapters/out/prisma.payment.repository.adapter'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaymentMethodService } from './application/payment.-methods.service'

@Module({
  imports: [],
  controllers: [PaymentMethodsController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'IPaymentMethodsServicePort',
      useClass: PaymentMethodService,
    },
    {
      provide: 'IPaymentMethodsRepositoryPort',
      useClass: PrismaPaymentMethodsRepositoryAdapter,
    },
  ],
})
export class PaymentMethodsModule {}
