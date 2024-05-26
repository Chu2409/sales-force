import { ILocationModel } from '../models/location.model'

export interface ILocationWithParentRes extends ILocationModel {
  parentId: number | null
}
