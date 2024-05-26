import { IServiceModel } from '../models/service.model'

export interface ICreateServiceDto extends Omit<IServiceModel, 'id'> {}
