import { IBrandModel } from '../models/brand.model'

export interface ICreateBrandDto extends Omit<IBrandModel, 'id'> {}
