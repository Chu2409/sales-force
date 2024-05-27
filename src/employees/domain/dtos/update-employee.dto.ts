import { ICreateEmployeeDto } from './create-employee.dto'

export interface IUpdateEmployeeDto extends Partial<ICreateEmployeeDto> {}
