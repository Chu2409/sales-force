import { IPersonModel, PersonGender } from '../models/person.model'

export interface ICreatePersonDto
  extends Pick<IPersonModel, 'dni' | 'name' | 'lastName'> {
  secondName?: string
  secondLastName?: string
  gender?: PersonGender
  email?: string
  phone?: string
  birthdate?: Date
  locationId: number
}
