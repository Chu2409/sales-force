import { ICreatePersonDto } from 'src/people/domain/dtos/create-person.dto'
import { IEmployeeModel } from '../models/employee.model'

export interface ICreateEmployeeDto
  extends Omit<IEmployeeModel, 'id' | 'person' | 'isActive'> {
  person: ICreatePersonDto
  isActive?: boolean
}
