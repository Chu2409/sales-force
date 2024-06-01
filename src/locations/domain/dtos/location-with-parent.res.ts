import { ILocation } from '../models/location.interface'
import { ILocationRes } from './location.res'

export interface ILocationWithParentRes extends Omit<ILocation, 'parent'> {
  parent: ILocationRes | null
}
