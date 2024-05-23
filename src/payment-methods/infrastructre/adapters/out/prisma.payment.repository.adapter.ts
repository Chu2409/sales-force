import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaymentMethodsMapper } from '../mappers/payment-methods.mapper'
import { PaymentMethodModel } from 'src/payment-methods/domain/models/payment-method'
import { IPaymentMethodsRepositoryPort } from 'src/payment-methods/domain/ports/out/payment-methods.repository.port'

@Injectable()
export class PrismaPaymentMethodsRepositoryAdapter
  implements IPaymentMethodsRepositoryPort
{
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getPaymentMethods(): Promise<PaymentMethodModel[]> {
    return PaymentMethodsMapper.toModels(
      await this.prismaService.payMethod.findMany(),
    )
  }

  async getPaymentMethodById(id: number): Promise<PaymentMethodModel> {
    return PaymentMethodsMapper.toModel(
      await this.prismaService.payMethod.findUnique({
        where: { id },
      }),
    )
  }

  async createPaymentMethod(
    brand: PaymentMethodModel,
  ): Promise<PaymentMethodModel> {
    return PaymentMethodsMapper.toModel(
      await this.prismaService.payMethod.create({
        data: {
          name: brand.getName(),
        },
      }),
    )
  }

  async updatePaymentMethod(
    id: number,
    brand: PaymentMethodModel,
  ): Promise<PaymentMethodModel> {
    return PaymentMethodsMapper.toModel(
      await this.prismaService.payMethod.update({
        where: { id },
        data: {
          name: brand.getName(),
        },
      }),
    )
  }

  async deletePaymentMethod(id: number): Promise<boolean> {
    const brand = await this.prismaService.payMethod.delete({
      where: { id },
    })

    return !!brand
  }
}
