import { ILocationRes } from 'src/locations/domain/dtos/location.res'
import { IPerson } from '../models/person.interface'

export interface IPersonRes extends Omit<IPerson, 'location'> {
  location: ILocationRes
}
