import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { IEmployeesRepositoryPort } from 'src/employees/domain/ports/out/employees.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { ICreateEmployeeDto } from 'src/employees/domain/dtos/create-employee.dto'
import { IUpdateEmployeeDto } from 'src/employees/domain/dtos/update-employee.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { EmployeesMapper } from './employees.mapper'
import { IAssignPermissionDto } from 'src/employees/domain/dtos/assign-permission.dto'
import { MODULES_SERVICE_PORT } from 'src/modules/shared/modules-providers.consts'
import { ModulesService } from 'src/modules/application/modules.service'
import { LOCATIONS_SERVICE_PORT } from 'src/locations/shared/locations-providers.consts'
import { LocationsService } from 'src/locations/application/locations.service'
import * as bcrypt from 'bcrypt'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'

@Injectable()
export class EmployeesPrismaRepositoryAdapter
  implements IEmployeesRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
    @Inject(MODULES_SERVICE_PORT)
    private readonly modulesService: ModulesService,
    @Inject(LOCATIONS_SERVICE_PORT)
    private readonly locationsService: LocationsService,
  ) {}

  async getEmployees(): Promise<IEmployeeRes[]> {
    const employees = await this.prismaService.employee.findMany({
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return employees.map((employee) => EmployeesMapper.toRes(employee))
  }

  async getPermissionsByEmployeeId(id: number): Promise<IModuleRes[]> {
    await this.getEmployeeById(id)

    const modules = await this.prismaService.permission.findMany({
      where: { employeeId: id },
      include: { module: true },
    })

    return modules.map((module) => module.module)
  }

  async assignPermission(
    employeeId: number,
    dto: IAssignPermissionDto,
  ): Promise<boolean> {
    await this.getEmployeeById(employeeId)
    await this.modulesService.getModuleById(dto.moduleId)

    const permissionExists = await this.prismaService.permission.findFirst({
      where: { employeeId, moduleId: dto.moduleId },
    })

    if (permissionExists)
      throw new BadRequestException('Permission already exists')

    const permisssion = await this.prismaService.permission.create({
      data: { employeeId, moduleId: dto.moduleId },
    })

    return !!permisssion
  }

  async getEmployeeById(id: number): Promise<IEmployeeRes> {
    const employee = await this.prismaService.employee.findUnique({
      where: { id },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    if (!employee) throw new NotFoundException('Employee not found')

    return EmployeesMapper.toRes(employee)
  }

  async createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes> {
    await this.locationsService.getLocationById(employee.person.locationId)

    const encryptedPassword = await bcrypt.hash(employee.password, 10)

    const createdEmployee = await this.prismaService.employee.create({
      data: {
        ...employee,
        password: encryptedPassword,
        person: {
          create: {
            ...employee.person,
          },
        },
      },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return EmployeesMapper.toRes(createdEmployee)
  }

  async updateEmployee(
    id: number,
    employee: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes> {
    await this.getEmployeeById(id)

    if (employee.person?.locationId) {
      await this.locationsService.getLocationById(employee.person.locationId)
    }

    const encryptedPassword = employee.password
      ? await bcrypt.hash(employee.password, 10)
      : undefined

    const updatedEmployee = await this.prismaService.employee.update({
      where: { id },
      data: {
        ...employee,
        password: encryptedPassword,
        person: {
          update: {
            data: {
              ...employee.person,
            },
          },
        },
      },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return EmployeesMapper.toRes(updatedEmployee)
  }

  async deleteEmployee(id: number): Promise<boolean> {
    await this.getEmployeeById(id)

    const employee = await this.prismaService.employee.update({
      where: { id },
      data: { isActive: false },
    })
    return !!employee
  }
}
