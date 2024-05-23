import { Inject, Injectable } from '@nestjs/common'
import { IPaymentMethodsServicePort } from '../domain/ports/in/payment-mehtods.service.port'
import { IPaymentMethodsRepositoryPort } from '../domain/ports/out/payment-methods.repository.port'
import { PaymentMethodModel } from '../domain/models/payment-method'

@Injectable()
export class PaymentMethodService implements IPaymentMethodsServicePort {
  constructor(
    @Inject('IPaymentMethodsRepositoryPort')
    private readonly repository: IPaymentMethodsRepositoryPort,
  ) {}

  async createPaymentMethod(
    model: PaymentMethodModel,
  ): Promise<PaymentMethodModel> {
    return this.repository.createPaymentMethod(model)
  }

  async updatePaymentMethod(
    id: number,
    model: PaymentMethodModel,
  ): Promise<PaymentMethodModel> {
    return this.repository.updatePaymentMethod(id, model)
  }

  async deletePaymentMethod(id: number): Promise<boolean> {
    return this.repository.deletePaymentMethod(id)
  }

  async getPaymentMethods(): Promise<PaymentMethodModel[]> {
    return this.repository.getPaymentMethods()
  }

  async getPaymentMethodById(id: number): Promise<PaymentMethodModel> {
    return this.repository.getPaymentMethodById(id)
  }
}
