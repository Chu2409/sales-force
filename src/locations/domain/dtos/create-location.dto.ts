import { ILocation } from '../models/location.interface'

export interface ICreateLocationDto
  extends Omit<ILocation, 'id' | 'parent' | 'isActive'> {
  isActive?: boolean
  parentId?: number
}
