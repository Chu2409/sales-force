import { IPayMethodModel } from '../models/pay-method.model'

export interface ICreatePayMethodDto extends Omit<IPayMethodModel, 'id'> {}
