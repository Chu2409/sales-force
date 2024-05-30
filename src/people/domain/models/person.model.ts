import { ILocationModel } from 'src/locations/domain/models/location.model'

export enum PersonGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface IPersonModel {
  id: number
  dni: string
  name: string
  secondName: string | null
  lastName: string
  secondLastName: string | null
  gender: PersonGender | null
  email: string | null
  phone: string | null
  birthdate: Date | null
  location: ILocationModel
}