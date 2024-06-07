import { Inject, Injectable } from '@nestjs/common'
import { IEmployeesServicePort } from '../domain/ports/in/employees.service.port'
import { IEmployeesRepositoryPort } from '../domain/ports/out/employees.repository.port'
import { EMPLOYEES_REPOSITORY_PORT } from '../shared/employees-providers.consts'
import { IEmployeeRes } from '../domain/dtos/employee.res'
import { ICreateEmployeeDto } from '../domain/dtos/create-employee.dto'
import { IUpdateEmployeeDto } from '../domain/dtos/update-employee.dto'
import { IAssignPermissionDto } from '../domain/dtos/assign-permission.dto'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'

@Injectable()
export class EmployeesService implements IEmployeesServicePort {
  constructor(
    @Inject(EMPLOYEES_REPOSITORY_PORT)
    private readonly repository: IEmployeesRepositoryPort,
  ) {}

  async getEmployees(): Promise<IEmployeeRes[]> {
    return await this.repository.getEmployees()
  }

  async getPermissionsByEmployeeId(id: number): Promise<IModuleRes[]> {
    return await this.repository.getPermissionsByEmployeeId(id)
  }

  async assignPermission(
    id: number,
    dto: IAssignPermissionDto,
  ): Promise<boolean> {
    return await this.repository.assignPermission(id, dto)
  }

  async createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes> {
    return await this.repository.createEmployee(employee)
  }

  async getEmployeeById(employeeId: number): Promise<IEmployeeRes> {
    return await this.repository.getEmployeeById(employeeId)
  }

  async updateEmployee(
    id: number,
    employee: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes> {
    return await this.repository.updateEmployee(id, employee)
  }

  async deleteEmployee(employeeId: number): Promise<boolean> {
    return await this.repository.deleteEmployee(employeeId)
  }
}
