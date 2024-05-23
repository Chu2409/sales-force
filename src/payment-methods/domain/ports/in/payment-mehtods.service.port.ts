import { PaymentMethodModel } from '../../models/payment-method'

export interface IPaymentMethodsServicePort {
  createPaymentMethod(
    paymentMethod: PaymentMethodModel,
  ): Promise<PaymentMethodModel>
  updatePaymentMethod(
    id: number,
    paymentMethod: PaymentMethodModel,
  ): Promise<PaymentMethodModel>
  deletePaymentMethod(id: number): Promise<boolean>
  getPaymentMethods(): Promise<PaymentMethodModel[]>
  getPaymentMethodById(id: number): Promise<PaymentMethodModel>
}
