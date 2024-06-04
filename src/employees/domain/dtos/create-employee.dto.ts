import { ICreatePersonDto } from 'src/people/domain/dtos/create-person.dto'
import { IEmployee } from '../models/employee.interface'

export interface ICreateEmployeeDto
  extends Omit<IEmployee, 'id' | 'person' | 'isActive'> {
  person: ICreatePersonDto
  isActive?: boolean
}
