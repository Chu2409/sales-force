import { IPersonWithLocationRes } from 'src/people/domain/dtos/person-with-location.res'
import { IEmployee } from '../models/employee.interface'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'

export interface IEmployeePermissionsRes extends Omit<IEmployee, 'person'> {
  person: IPersonWithLocationRes
  modules: IModuleRes[]
}
