import { Inject, Injectable } from '@nestjs/common'
import { IEmployeesServicePort } from '../domain/ports/in/employees.service.port'
import { IEmployeesRepositoryPort } from '../domain/ports/out/employees.repository.port'
import { EMPLOYEES_REPOSITORY_PORT } from '../shared/employees-providers.consts'
import { IEmployeeRes } from '../domain/dtos/employee.res'
import { ICreateEmployeeDto } from '../domain/dtos/create-employee.dto'
import { IUpdateEmployeeDto } from '../domain/dtos/update-employee.dto'
import { IAssignPermissionDto } from '../domain/dtos/assign-permission.dto'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { MODULES_SERVICE_PORT } from 'src/modules/shared/modules-providers.consts'
import { ModulesService } from 'src/modules/application/modules.service'
import { LOCATIONS_SERVICE_PORT } from 'src/locations/shared/locations-providers.consts'
import { LocationsService } from 'src/locations/application/locations.service'

@Injectable()
export class EmployeesService implements IEmployeesServicePort {
  constructor(
    @Inject(EMPLOYEES_REPOSITORY_PORT)
    private readonly repository: IEmployeesRepositoryPort,
    @Inject(MODULES_SERVICE_PORT)
    private readonly modulesService: ModulesService,
    @Inject(LOCATIONS_SERVICE_PORT)
    private readonly locationsService: LocationsService,
  ) {}

  async getEmployees(): Promise<IEmployeeRes[]> {
    return await this.repository.getEmployees()
  }

  async getPermissionsByEmployeeId(id: number): Promise<IModuleRes[]> {
    const employee = await this.getEmployeeById(id)
    if (!employee) throw new AppError('Employee not found', Errors.NOT_FOUND)

    return await this.repository.getPermissionsByEmployeeId(id)
  }

  async assignPermission(
    id: number,
    dto: IAssignPermissionDto,
  ): Promise<boolean> {
    await this.getEmployeeById(id)
    await this.modulesService.getModuleById(dto.moduleId)

    if (await this.repository.checkPermissionExists(id, dto.moduleId))
      throw new AppError('Permission already exists', Errors.CONFLICT)

    return await this.repository.assignPermission(id, dto)
  }

  async createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes> {
    await this.locationsService.getLocationById(employee.person.locationId)

    const createdEmployee = await this.repository.createEmployee(employee)

    if (!createdEmployee)
      throw new AppError('Employee not created', Errors.INTERNAL_SERVER_ERROR)

    return createdEmployee
  }

  async getEmployeeById(employeeId: number): Promise<IEmployeeRes> {
    const employee = await this.repository.getEmployeeById(employeeId)
    if (!employee) throw new AppError('Employee not found', Errors.NOT_FOUND)

    return employee
  }

  async updateEmployee(
    id: number,
    employee: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes> {
    await this.getEmployeeById(id)
    if (employee.person?.locationId) {
      await this.locationsService.getLocationById(employee.person.locationId)
    }

    const updatedEmployee = await this.repository.updateEmployee(id, employee)

    if (!updatedEmployee)
      throw new AppError('Employee not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedEmployee
  }

  async toggleEmployeeActive(employeeId: number): Promise<boolean> {
    const employee = await this.getEmployeeById(employeeId)
    if (!employee) throw new AppError('Employee not found', Errors.NOT_FOUND)

    return await this.repository.setEmployeeActive(
      employeeId,
      !employee.isActive,
    )
  }
}
