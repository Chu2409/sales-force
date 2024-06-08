import { IPerson, PersonGender } from '../models/person.interface'

export interface ICreatePersonDto
  extends Pick<IPerson, 'dni' | 'name' | 'lastName'> {
  secondName?: string
  secondLastName?: string
  gender?: PersonGender
  email?: string
  phone?: string
  birthdate?: Date
  locationId: number
}
