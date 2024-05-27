import { ILocationModel } from '../models/location.model'

export interface ILocationRes extends Omit<ILocationModel, 'parent'> {}
