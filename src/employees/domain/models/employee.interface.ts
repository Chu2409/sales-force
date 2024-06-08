import { IPerson } from 'src/people/domain/models/person.interface'

export enum EmployeeRole {
  SELLER = 'SELLER',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
}

export interface IEmployee {
  id: number
  username: string
  password: string
  role: EmployeeRole
  isActive: boolean
  person: IPerson
}
