import { ICreatePayMethodDto } from '../../dtos/create-pay-method.dto'
import { IPayMethodRes } from '../../dtos/pay-method.res'
import { IUpdatePayMethodDto } from '../../dtos/update-pay-method.dto'

export interface IPayMethodsServicePort {
  createPayMethod(payMethod: ICreatePayMethodDto): Promise<IPayMethodRes>
  updatePayMethod(
    id: number,
    payMethod: IUpdatePayMethodDto,
  ): Promise<IPayMethodRes>
  togglePayMethodActive(id: number): Promise<boolean>
  getPayMethods(): Promise<IPayMethodRes[]>
  getPayMethodById(id: number): Promise<IPayMethodRes>
}
