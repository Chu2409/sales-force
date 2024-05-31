import { IBrand } from '../models/brand.model'

export interface ICreateBrandDto extends Omit<IBrand, 'id'> {}
