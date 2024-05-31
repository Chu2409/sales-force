import { IPersonModel } from 'src/people/domain/models/person.model'

export enum ConsumerType {
  NATURAL = 'NATURAL',
  COMPANY = 'COMPANY',
}

export interface IConsumer {
  id: number
  type: ConsumerType
  isCustomer: boolean
  person: IPersonModel
}
