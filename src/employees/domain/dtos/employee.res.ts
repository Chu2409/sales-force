import { IPersonRes } from 'src/people/domain/dtos/person.res'
import { IEmployee } from '../models/employee.interface'

export interface IEmployeeRes extends Omit<IEmployee, 'person'> {
  person: IPersonRes
}
