import { ILocation } from '../models/location.interface'

export interface ICreateLocationDto extends Omit<ILocation, 'id' | 'isActive'> {
  isActive?: boolean
}
