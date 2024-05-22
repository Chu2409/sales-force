import { Inject, Injectable } from '@nestjs/common'
import { IEmployeesServicePort } from '../domain/ports/in/employees.service.port'
import { IEmployeesRepositoryPort } from '../domain/ports/out/employees.repository.port'
import { EmployeeModel } from '../domain/models/employee'

@Injectable()
export class EmployeesService implements IEmployeesServicePort {
  constructor(
    @Inject('IEmployeesRepositoryPort')
    private readonly repository: IEmployeesRepositoryPort,
  ) {}

  public async getEmployees(): Promise<EmployeeModel[]> {
    return this.repository.getEmployees()
  }

  public async createEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    return this.repository.createEmployee(employee)
  }

  public async getEmployeeById(employeeId: number): Promise<EmployeeModel> {
    return this.repository.getEmployeeById(employeeId)
  }

  public async updateEmployee(
    id: number,
    employee: EmployeeModel,
  ): Promise<EmployeeModel> {
    return this.repository.updateEmployee(id, employee)
  }

  public async deleteEmployee(employeeId: number): Promise<boolean> {
    return this.repository.deleteEmployee(employeeId)
  }
}
