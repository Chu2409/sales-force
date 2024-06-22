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
    await this.removeAllPermissions(employeeId)

    const moduleToAssign = [...dto.moduleId, 1]

    const permissions = moduleToAssign.map((moduleId) => ({
      employeeId,
      moduleId,
    }))

    const createdPermissions = await this.prismaService.permission.createMany({
      data: permissions,
    })

    return !!createdPermissions
  }

  async removeAllPermissions(employeeId: number): Promise<boolean> {
    const permissions = await this.prismaService.permission.deleteMany({
      where: { employeeId },
    })

    return !!permissions
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

  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10)
  }

  async createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes> {
    const createdEmployee = await this.prismaService.employee.create({
      data: {
        ...employee,
        password: this.encryptPassword(employee.password),
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
    const updatedEmployee = await this.prismaService.employee.update({
      where: { id },
      data: {
        ...employee,
        password: employee.password
          ? this.encryptPassword(employee.password)
          : undefined,
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
