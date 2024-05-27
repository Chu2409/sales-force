import { IPersonModel, PersonGender } from '../models/person.model'

export interface ICreatePersonDto
  extends Pick<IPersonModel, 'name' | 'name' | 'lastName' | 'dni'> {
  secondName?: string
  secondLastName?: string
  gender?: PersonGender
  email?: string
  phone?: string
  birthdate?: Date
}
