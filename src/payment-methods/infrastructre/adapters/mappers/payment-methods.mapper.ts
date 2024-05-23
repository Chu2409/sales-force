import { Brand } from '@prisma/client'
import { CreatePaymentMethodDto } from '../in/dtos/create-payment-method.dto'
import { UpdatePaymentMethodDto } from '../in/dtos/update-payment-method.dto'
import { PaymentMethodModel } from 'src/payment-methods/domain/models/payment-method'

export class PaymentMethodsMapper {
  public static toModel(paymentMethod: Brand): PaymentMethodModel {
    return new PaymentMethodModel(paymentMethod.id, paymentMethod.name)
  }

  public static toModels(brands: Brand[]): PaymentMethodModel[] {
    return brands.map((paymentMethod) => this.toModel(paymentMethod))
  }

  public static dtoToModel(
    dto: CreatePaymentMethodDto | UpdatePaymentMethodDto,
  ): PaymentMethodModel {
    return new PaymentMethodModel(undefined, dto.name)
  }
}
