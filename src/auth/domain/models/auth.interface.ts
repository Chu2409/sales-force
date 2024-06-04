import { IEmployee } from 'src/employees/domain/models/employee.interface'

export interface IAuth extends Pick<IEmployee, 'username' | 'password'> {}
