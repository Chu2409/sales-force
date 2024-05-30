import { ILocationRes } from 'src/locations/domain/dtos/location.res'
import { IPersonModel } from '../models/person.model'

export interface IPersonRes extends Omit<IPersonModel, 'location'> {
  location: ILocationRes
}
