import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'

export interface IAuthRepositoryPort {
  getEmployeeByUsername(username: string): Promise<IEmployeeRes>

  comparePasswords(password: string, hash: string): boolean

  signIn(id: number): string
}
