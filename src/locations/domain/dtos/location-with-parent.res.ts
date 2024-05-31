import { ILocationModel } from '../models/location.model'
import { ILocationRes } from './location.res'

export interface ILocationWithParentRes extends Omit<ILocationModel, 'parent'> {
  parent: ILocationRes | null
}
