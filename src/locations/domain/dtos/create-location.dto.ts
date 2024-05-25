import { LocationTypeModel } from '../models/location'

export interface ICreateLocationDto {
  name: string
  type: LocationTypeModel
  parentId: number | null
}
