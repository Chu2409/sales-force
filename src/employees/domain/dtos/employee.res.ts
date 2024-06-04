import { IPersonWithLocationRes } from 'src/people/domain/dtos/person-with-location.res'
import { IEmployee } from '../models/employee.interface'

export interface IEmployeeRes extends Omit<IEmployee, 'person'> {
  person: IPersonWithLocationRes
}
