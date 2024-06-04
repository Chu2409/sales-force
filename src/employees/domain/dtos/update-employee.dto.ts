import { IUpdatePersonDto } from 'src/people/domain/dtos/update-person.dto'
import { ICreateEmployeeDto } from './create-employee.dto'

export interface IUpdateEmployeeDto
  extends Partial<Omit<ICreateEmployeeDto, 'person'>> {
  person?: IUpdatePersonDto
}
