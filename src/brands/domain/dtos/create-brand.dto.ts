import { IBrand } from '../models/brand.interface'

export interface ICreateBrandDto extends Omit<IBrand, 'id'> {}
