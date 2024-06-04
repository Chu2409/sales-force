import { IPerson } from '../models/person.interface'

export interface IPersonRes extends Omit<IPerson, 'location'> {}
