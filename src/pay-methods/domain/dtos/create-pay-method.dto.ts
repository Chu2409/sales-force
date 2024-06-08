import { IPayMethod } from '../models/pay-method.interface'

export interface ICreatePayMethodDto
  extends Omit<IPayMethod, 'id' | 'isActive'> {
  isActive?: boolean
}
