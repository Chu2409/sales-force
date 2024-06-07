import { Inject, Injectable } from '@nestjs/common'
import { IEmployeesRepositoryPort } from 'src/employees/domain/ports/out/employees.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { ICreateEmployeeDto } from 'src/employees/domain/dtos/create-employee.dto'
import { IUpdateEmployeeDto } from 'src/employees/domain/dtos/update-employee.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { EmployeesMapper } from './employees.mapper'
import { IAssignPermissionDto } from 'src/employees/domain/dtos/assign-permission.dto'
import * as bcrypt from 'bcrypt'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'

@Injectable()
export class EmployeesPrismaRepositoryAdapter
  implements IEmployeesRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
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
    const permission = await this.prismaService.permission.create({
      data: { employeeId, moduleId: dto.moduleId },
    })

    return !!permission
  }

  async checkPermissionExists(
    employeeId: number,
    moduleId: number,
  ): Promise<boolean> {
    const permissionExists = await this.prismaService.permission.findFirst({
      where: { employeeId, moduleId },
    })

    return !!permissionExists
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

    return employee ? EmployeesMapper.toRes(employee) : null
  }

  async createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes> {
    const encryptedPassword = bcrypt.hashSync(employee.password, 10)

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

    return createdEmployee ? EmployeesMapper.toRes(createdEmployee) : null
  }

  async updateEmployee(
    id: number,
    employee: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes> {
    const encryptedPassword = employee.password
      ? bcrypt.hashSync(employee.password, 10)
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

    return updatedEmployee ? EmployeesMapper.toRes(updatedEmployee) : null
  }

  async setEmployeeActive(id: number, state: boolean): Promise<boolean> {
    const employee = await this.prismaService.employee.update({
      where: { id },
      data: { isActive: state },
    })
    return !!employee
  }
}
