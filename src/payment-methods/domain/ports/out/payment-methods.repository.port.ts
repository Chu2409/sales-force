import { PaymentMethodModel } from '../../models/payment-method'

export interface IPaymentMethodsRepositoryPort {
  createPaymentMethod(brand: PaymentMethodModel): Promise<PaymentMethodModel>
  updatePaymentMethod(
    id: number,
    brand: PaymentMethodModel,
  ): Promise<PaymentMethodModel>
  deletePaymentMethod(id: number): Promise<boolean>
  getPaymentMethods(): Promise<PaymentMethodModel[]>
  getPaymentMethodById(id: number): Promise<PaymentMethodModel>
}
