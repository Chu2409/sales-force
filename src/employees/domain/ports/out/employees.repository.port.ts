import { EmployeeModel } from '../../models/employee'

export interface IEmployeesRepositoryPort {
  getEmployees(): Promise<EmployeeModel[]>
  getEmployeeById(id: number): Promise<EmployeeModel | null>
  createEmployee(employee: EmployeeModel): Promise<EmployeeModel>
  updateEmployee(id: number, employee: EmployeeModel): Promise<EmployeeModel>
  deleteEmployee(id: number): Promise<boolean>
}
