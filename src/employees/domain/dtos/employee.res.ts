import { IPersonRes } from 'src/people/domain/dtos/person.res'
import { IEmployeeModel } from '../models/employee.model'

export interface IEmployeeRes extends Omit<IEmployeeModel, 'person'> {
  person: IPersonRes
}
