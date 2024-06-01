import { IPerson } from 'src/people/domain/models/person.interface'

export enum ConsumerType {
  NATURAL = 'NATURAL',
  COMPANY = 'COMPANY',
}

export interface IConsumer {
  id: number
  type: ConsumerType
  isCustomer: boolean
  person: IPerson
}
