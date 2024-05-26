import { ILocationModel } from '../models/location.model'

export interface ICreateLocationDto
  extends Omit<ILocationModel, 'id' | 'parent'> {
  parentId?: number
}
