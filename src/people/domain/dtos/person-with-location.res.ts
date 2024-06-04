import { ILocationRes } from 'src/locations/domain/dtos/location.res'
import { IPerson } from '../models/person.interface'

export interface IPersonWithLocationRes extends Omit<IPerson, 'location'> {
  location: ILocationRes
}
